package com.nomz.doctorstudy.conference.service;

import com.nomz.doctorstudy.blockinterpreter.BlockInterpreter;
import com.nomz.doctorstudy.blockinterpreter.ProcessContext;
import com.nomz.doctorstudy.blockinterpreter.ProcessManager;
import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.common.exception.CommonErrorCode;
import com.nomz.doctorstudy.conference.entity.Conference;
import com.nomz.doctorstudy.conference.ConferenceErrorCode;
import com.nomz.doctorstudy.conference.dto.ConferenceSearchFilter;
import com.nomz.doctorstudy.conference.entity.ConferenceMember;
import com.nomz.doctorstudy.conference.entity.ConferenceMemberInvite;
import com.nomz.doctorstudy.conference.entity.ConferenceMemberInviteId;
import com.nomz.doctorstudy.conference.repository.ConferenceMemberInviteRepository;
import com.nomz.doctorstudy.conference.repository.ConferenceMemberRepository;
import com.nomz.doctorstudy.conference.repository.ConferenceQueryRepository;
import com.nomz.doctorstudy.conference.repository.ConferenceRepository;
import com.nomz.doctorstudy.conference.request.*;
import com.nomz.doctorstudy.conference.room.RoomService;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.repository.MemberRepository;
import com.nomz.doctorstudy.moderator.ModeratorErrorCode;
import com.nomz.doctorstudy.moderator.entity.Moderator;
import com.nomz.doctorstudy.moderator.repository.ModeratorRepository;
import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import com.nomz.doctorstudy.studygroup.exception.StudyGroupErrorCode;
import com.nomz.doctorstudy.studygroup.exception.StudyGroupException;
import com.nomz.doctorstudy.studygroup.repository.StudyGroupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConferenceServiceImpl implements ConferenceService {
    private final MemberRepository memberRepository;
    private final ModeratorRepository moderatorRepository;
    private final StudyGroupRepository studyGroupRepository;
    private final ConferenceRepository conferenceRepository;
    private final ConferenceQueryRepository conferenceQueryRepository;
    private final ConferenceMemberRepository conferenceMemberRepository;
    private final ConferenceMemberInviteRepository conferenceMemberInviteRepository;

    private final RoomService roomService;

    @Override
    @Transactional
    public Long createConference(Member requester, CreateConferenceRequest request) {
        StudyGroup studyGroup = studyGroupRepository.findById(request.getStudyGroupId())
                .orElseThrow(() -> new StudyGroupException(StudyGroupErrorCode.STUDYGROUP_NOT_FOUND_ERROR));

        Conference conference = Conference.builder()
                .moderator(null)
                .host(requester)
                .studyGroup(studyGroup)
                .title(request.getTitle())
                .subject(request.getSubject())
                .memberCapacity(request.getMemberCapacity())
                .build();
        conferenceRepository.save(conference);

        log.info("[new conference] id={}, title={}", conference.getId(), conference.getTitle());

        return conference.getId();
    }

    @Override
    @Transactional
    public Conference getConference(Long conferenceId) {
        return conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_FOUND_ERROR));
    }

    @Override
    public List<Conference> getConferenceList(GetConferenceListRequest request) {
        return conferenceQueryRepository.getConferenceList(
                ConferenceSearchFilter.builder()
                        .memberId(request.getMemberId())
                        .studyGroupId(request.getStudyGroupId())
                        .lowerBoundDate(request.getLowerBoundDate())
                        .upperBoundDate(request.getUpperBoundDate())
                        .build()
        );
    }

    @Override
    public List<Member> getConferenceParticipantList(Long conferenceId) {
        List<ConferenceMember> conferenceMembers = conferenceMemberRepository.findByConferenceId(conferenceId);

        return conferenceMembers.stream()
                .map(ConferenceMember::getMember)
                .toList();
    }

    @Override
    @Transactional
    public void openConference(Long conferenceId, OpenConferenceRequest request) {
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_FOUND_ERROR));

        Moderator moderator = moderatorRepository.findById(request.getModeratorId())
                .orElseThrow(() -> new BusinessException(ModeratorErrorCode.MODERATOR_NOT_FOUND));

        conference.updateModerator(moderator);
        conference.updateStartTime(LocalDateTime.now());

        roomService.openRoom(conferenceId, moderator.getProcessor().getScript());
    }

    @Override
    @Transactional
    public void startConference(Long conferenceId) {
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_FOUND_ERROR));

        roomService.startRoom(conferenceId);
    }

    @Override
    @Transactional
    public void closeConference(Long conferenceId) {
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_FOUND_ERROR));

        conference.updateFinishTime(LocalDateTime.now());

        roomService.closeRoom(conferenceId);
    }

    @Override
    @Transactional
    public List<String> joinConference(Member requester, Long conferenceId, JoinConferenceRequest request) {
        List<String> peerIds = roomService.joinRoom(requester, conferenceId, request.getPeerId());

        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_FOUND_ERROR));

        conferenceMemberRepository.save(ConferenceMember.of(conference, requester));

        return peerIds;
    }

    @Override
    @Transactional
    public void inviteMemberConference(Member requester, Long conferenceId, InviteMemberConferenceRequest request) {
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_FOUND_ERROR));

        if (requester.getId() != conference.getHost().getId()) {
            throw new BusinessException(CommonErrorCode.FORBIDDEN, "호스트 유저만이 초대할 수 있습니다.");
        }

        Long inviteeId = request.getInviteeId();
        Member member = memberRepository.findById(inviteeId)
                .orElseThrow(() -> new BusinessException(CommonErrorCode.BAD_REQUEST, "초대할 멤버의 아이디를 찾을 수 없습니다."));

        ConferenceMemberInvite conferenceMemberInvite = ConferenceMemberInvite.builder()
                .id(new ConferenceMemberInviteId(conferenceId, inviteeId))
                .conference(conference)
                .member(member)
                .build();
        conferenceMemberInviteRepository.save(conferenceMemberInvite);
    }
}
