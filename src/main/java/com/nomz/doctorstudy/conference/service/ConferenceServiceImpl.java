package com.nomz.doctorstudy.conference.service;

import com.nomz.doctorstudy.image.entity.Image;
import com.nomz.doctorstudy.image.repository.ImageRepository;
import com.nomz.doctorstudy.moderator.AvatarTypeResolver;
import com.nomz.doctorstudy.blockinterpreter.ConferenceContext;
import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.common.exception.CommonErrorCode;
import com.nomz.doctorstudy.conference.ConferenceEvent;
import com.nomz.doctorstudy.conference.entity.Conference;
import com.nomz.doctorstudy.conference.ConferenceErrorCode;
import com.nomz.doctorstudy.conference.dto.ConferenceSearchFilter;
import com.nomz.doctorstudy.conference.entity.ConferenceMemberHistory;
import com.nomz.doctorstudy.conference.entity.ConferenceMemberInvite;
import com.nomz.doctorstudy.conference.repository.ConferenceMemberInviteRepository;
import com.nomz.doctorstudy.conference.repository.ConferenceMemberHistoryRepository;
import com.nomz.doctorstudy.conference.repository.ConferenceQueryRepository;
import com.nomz.doctorstudy.conference.repository.ConferenceRepository;
import com.nomz.doctorstudy.conference.request.*;
import com.nomz.doctorstudy.conference.room.RoomErrorCode;
import com.nomz.doctorstudy.conference.room.RoomService;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.exception.member.MemberErrorCode;
import com.nomz.doctorstudy.member.exception.member.MemberException;
import com.nomz.doctorstudy.member.repository.MemberRepository;
import com.nomz.doctorstudy.moderator.ModeratorErrorCode;
import com.nomz.doctorstudy.moderator.entity.Moderator;
import com.nomz.doctorstudy.moderator.repository.ModeratorRepository;
import com.nomz.doctorstudy.notification.NotificationService;
import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import com.nomz.doctorstudy.studygroup.exception.StudyGroupErrorCode;
import com.nomz.doctorstudy.studygroup.exception.StudyGroupException;
import com.nomz.doctorstudy.studygroup.repository.StudyGroupRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class ConferenceServiceImpl implements ConferenceService {
    private final MemberRepository memberRepository;
    private final ModeratorRepository moderatorRepository;
    private final StudyGroupRepository studyGroupRepository;
    private final ConferenceRepository conferenceRepository;
    private final ConferenceQueryRepository conferenceQueryRepository;
    private final ConferenceMemberHistoryRepository conferenceMemberHistoryRepository;
    private final ConferenceMemberInviteRepository conferenceMemberInviteRepository;

    private final RoomService roomService;
    private final NotificationService notificationService;

    private final TransactionTemplate transactionTemplate;
    private final ImageRepository imageRepository;

    @PostConstruct
    public void setQuitCallback() {
        roomService.setQuitMemberCallback(quitMemberInfo -> {
            removeConferenceMemberData(quitMemberInfo.getConferenceId(), quitMemberInfo.getMemberId());
        });
    }

    @Override
    @Transactional
    public Long createConference(Member requester, CreateConferenceRequest request) {
        StudyGroup studyGroup = studyGroupRepository.findById(request.getStudyGroupId())
                .orElseThrow(() -> new StudyGroupException(StudyGroupErrorCode.STUDYGROUP_NOT_FOUND_ERROR));

        Moderator moderator = moderatorRepository.findById(request.getModeratorId())
                .orElseThrow(() -> new BusinessException(ModeratorErrorCode.MODERATOR_NOT_FOUND));

        Image image = imageRepository.findById(request.getImageId())
                .orElseThrow(() -> new BusinessException(CommonErrorCode.RESOURCE_NOT_FOUND));

        Conference conference = Conference.builder()
                .moderator(moderator)
                .host(requester)
                .image(image)
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
        conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_FOUND_ERROR));

        try {
            return roomService.getParticipants(conferenceId)
                    .stream().map(info -> memberRepository.findById(info.getMemberId())
                            .orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_NOT_FOUND_ERROR)))
                    .toList();
        } catch (BusinessException e) {
            if (e.getErrorCode() == RoomErrorCode.ROOM_NOT_FOUND) {
                return List.of();
            }
            throw new BusinessException(CommonErrorCode.INTERNAL_SERVER_ERROR, "컨퍼런스 참여자 리스트를 구하는 도중 알 수 없는 오류가 발생했습니다.");
        }
    }

    @Override
    @Transactional
    public void openConference(Long conferenceId) {
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_FOUND_ERROR));

        if (conference.getOpenTime() != null) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_ALREADY_OPENED);
        }

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

        Moderator moderator = conference.getModerator();

        ConferenceContext conferenceContext = ConferenceContext.builder()
                .prePrompt(moderator.getProcessor().getPrePrompt())
                .subject(conference.getSubject())
                .participantInfoList(roomService.getParticipants(conferenceId))
                .voiceType(AvatarTypeResolver.resolveVoiceType(moderator.getAvatar().getVoiceType()))
                .characterType(AvatarTypeResolver.resolveCharacterType(moderator.getAvatar().getCharacterType()))
                .build();

        roomService.startRoom(conferenceId, moderator.getProcessor().getScript(), conferenceContext, () -> {
            transactionTemplate.executeWithoutResult(transactionStatus -> finishConference(conferenceId));
        });

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
            log.warn("이미 종료된 적이 있는 컨퍼런스입니다.");
            // throw new BusinessException(ConferenceErrorCode.CONFERENCE_ALREADY_FINISHED);
        }

        roomService.finishRoom(conferenceId);

        conference.updateFinishTime(LocalDateTime.now());
    }

    @Override
    @Transactional
    public List<String> joinConference(Member requester, Long conferenceId, JoinConferenceRequest request) {
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_FOUND_ERROR));

        if (conference.getOpenTime() == null) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_OPENED);
        }

        if (!(requester.getId().equals(conference.getHost().getId())) &&
                !conference.getInvitees().stream().map(ConferenceMemberInvite::getMember)
                        .map(Member::getId).toList().contains(requester.getId())) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_INVITED);
        }

        conferenceMemberHistoryRepository.save(ConferenceMemberHistory.of(conference, requester, ConferenceEvent.JOIN));

        List<String> peerIds = roomService.joinRoom(requester, conferenceId, request.getPeerId());

        return peerIds;
    }

    protected void removeConferenceMemberData(Long conferenceId, Long memberId) {
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_FOUND_ERROR));
        Member member = memberRepository.findById(memberId)
                        .orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_NOT_FOUND_ERROR));

        conferenceMemberHistoryRepository.save(ConferenceMemberHistory.of(conference, member, ConferenceEvent.QUIT));
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
        List<ConferenceMemberHistory> conferenceMemberHistories = conferenceMemberHistoryRepository.findByMemberId(memberId);

        if (conferenceMemberHistories.isEmpty()) {
            return Page.empty(pageable);
        }

        // 2. Conference ID 리스트 추출
        List<Long> conferenceIds = conferenceMemberHistories.stream()
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
