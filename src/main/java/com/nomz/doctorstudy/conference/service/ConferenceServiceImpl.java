package com.nomz.doctorstudy.conference.service;

import com.nomz.doctorstudy.blockinterpreter.BlockInterpreter;
import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.common.exception.CommonErrorCode;
import com.nomz.doctorstudy.conference.entity.Conference;
import com.nomz.doctorstudy.conference.ConferenceErrorCode;
import com.nomz.doctorstudy.conference.dto.ConferenceSearchFilter;
import com.nomz.doctorstudy.conference.entity.ConferenceMember;
import com.nomz.doctorstudy.conference.entity.ConferenceMemberInvite;
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
import com.nomz.doctorstudy.notification.NotificationService;
import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import com.nomz.doctorstudy.studygroup.exception.StudyGroupErrorCode;
import com.nomz.doctorstudy.studygroup.exception.StudyGroupException;
import com.nomz.doctorstudy.studygroup.repository.StudyGroupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;


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
    private final NotificationService notificationService;

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
                .scheduledTime(request.getScheduledTime())
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
    @Transactional
    public List<Conference> getConferenceList(GetConferenceListRequest request) {
        return conferenceQueryRepository.getConferenceList(
                ConferenceSearchFilter.builder()
                        .memberId(request.getMemberId())
                        .studyGroupId(request.getStudyGroupId())
                        .isOpened(request.getIsOpened())
                        .isClosed(request.getIsClosed())
                        .isStarted(request.getIsStarted())
                        .isFinished(request.getIsFinished())
                        .build()
        );
    }

    @Override
    @Transactional
    public List<Member> getConferenceParticipantList(Long conferenceId) {
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_FOUND_ERROR));

        return conference.getParticipants().stream()
                .map(ConferenceMember::getMember)
                .toList();
    }

    @Override
    @Transactional
    public void openConference(Long conferenceId, OpenConferenceRequest request) {
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_FOUND_ERROR));

        if (conference.getOpenTime() != null) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_ALREADY_OPENED);
        }

        Moderator moderator = moderatorRepository.findById(request.getModeratorId())
                .orElseThrow(() -> new BusinessException(ModeratorErrorCode.MODERATOR_NOT_FOUND));

        conference.updateModerator(moderator);
        conference.updateOpenTime(LocalDateTime.now());

        roomService.openRoom(conferenceId);
    }

    @Override
    @Transactional
    public void closeConference(Long conferenceId) {
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_FOUND_ERROR));

        if (conference.getOpenTime() == null) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_OPENED);
        }
        if (conference.getCloseTime() != null) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_ALREADY_CLOSED);
        }

        conference.updateCloseTime(LocalDateTime.now());

        roomService.closeRoom(conferenceId);
    }

    @Override
    @Transactional
    public void startConference(Long conferenceId) {
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_FOUND_ERROR));

        if (conference.getOpenTime() == null) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_OPENED);
        }
        if (conference.getStartTime() != null) {
            log.warn("시작된 적이 있는 Conference 입니다.");
            //throw new BusinessException(ConferenceErrorCode.CONFERENCE_ALREADY_STARTED);
        }

        roomService.startRoom(conferenceId, conference.getModerator().getProcessor().getScript());

        conference.updateStartTime(LocalDateTime.now());
    }

    @Override
    @Transactional
    public void finishConference(Long conferenceId) {
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_FOUND_ERROR));

        if (conference.getStartTime() == null) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_STARTED);
        }
        if (conference.getFinishTime() != null) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_ALREADY_FINISHED);
        }

        conference.updateFinishTime(LocalDateTime.now());

        roomService.finishRoom(conferenceId);
    }

    @Override
    @Transactional
    public List<String> joinConference(Member requester, Long conferenceId, JoinConferenceRequest request) {
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_FOUND_ERROR));

        if (!(requester.getId().equals(conference.getHost().getId())) &&
                !conference.getInvitees().stream().map(ConferenceMemberInvite::getMember)
                        .map(Member::getId).toList().contains(requester.getId()))
        {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_INVITED);
        }

        conferenceMemberRepository.save(ConferenceMember.of(conference, requester));

        List<String> peerIds = roomService.joinRoom(requester, conferenceId, request.getPeerId());

        return peerIds;
    }

    @Override
    @Transactional
    public void quitConference(Member requester, Long conferenceId) {
        roomService.quitRoom(requester.getId(), conferenceId);
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

        ConferenceMemberInvite conferenceMemberInvite = ConferenceMemberInvite.of(conference, member);
        conferenceMemberInviteRepository.save(conferenceMemberInvite);

        notificationService.createInvitationNotification(conferenceMemberInvite);
    }

    @Override
    @Transactional
    public List<Member> getConferenceInvitees(Long conferenceId) {
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_FOUND_ERROR));

        return conference.getInvitees().stream()
                .map(ConferenceMemberInvite::getMember)
                .toList();
    }

    @Override
    public Page<Conference> getConferenceListByMemberId(Long memberId, Pageable pageable) {
        // 1. 멤버가 속한 ConferenceMember 조회
        List<ConferenceMember> conferenceMembers = conferenceMemberRepository.findByMemberId(memberId);

        if (conferenceMembers.isEmpty()) {
            return Page.empty(pageable);
        }

        // 2. Conference ID 리스트 추출
        List<Long> conferenceIds = conferenceMembers.stream()
                .map(cm -> cm.getConference().getId())
                .collect(Collectors.toList());

        // 3. Conference ID로 Conference 조회
        List<Conference> conferences = conferenceRepository.findAllById(conferenceIds);

        // 4. 페이지네이션 처리
        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), conferences.size());
        List<Conference> pagedConferences = conferences.subList(start, end);

        return new PageImpl<>(pagedConferences, pageable, conferences.size());


    }
}
