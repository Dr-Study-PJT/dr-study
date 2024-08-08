package com.nomz.doctorstudy.notification;

import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.common.exception.CommonErrorCode;
import com.nomz.doctorstudy.conference.dto.ConferenceMemberInviteSearchFilter;
import com.nomz.doctorstudy.conference.entity.ConferenceMemberInvite;
import com.nomz.doctorstudy.conference.repository.ConferenceMemberInviteQueryRepository;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.notification.entity.Notification;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupApply;
import com.nomz.doctorstudy.studygroup.repository.StudyGroupMemberApplyQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final StudyGroupMemberApplyQueryRepository studyGroupMemberApplyQueryRepository;
    private final ConferenceMemberInviteQueryRepository conferenceMemberInviteQueryRepository;
    private final NotificationRepository notificationRepository;

    @Transactional
    public List<MemberStudyGroupApply> getStudyGroupApplications(Member requester) {
        return studyGroupMemberApplyQueryRepository.findMemberStudyGroupApplyListByCaptainId(requester.getId());
    }

    @Transactional
    public List<ConferenceMemberInvite> getConferenceInvitations(Member requester) {
        return conferenceMemberInviteQueryRepository.getConferenceMemberInviteList(
                ConferenceMemberInviteSearchFilter.builder().
                        inviteeId(requester.getId()).
                        build()
        );
    }

    @Transactional
    public void createNotification(MemberStudyGroupApply application) {
        Notification notification = Notification.of(application);
        notificationRepository.save(notification);
    }

    @Transactional
    public void createNotification(ConferenceMemberInvite invitation) {
        Notification notification = Notification.of(invitation);
        notificationRepository.save(notification);
    }

    @Transactional
    public List<Notification> getUnreadNotifications(Member requester) {
        return notificationRepository.findAllByRecipientAndIsReadIsFalse(requester);
    }

    @Transactional
    public void readNotification(Member requester, Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new BusinessException(CommonErrorCode.BAD_REQUEST, "해당하는 아이디의 알림이 없습니다."));

        if (notification.getRecipient() != requester) {
            throw new BusinessException(CommonErrorCode.FORBIDDEN, "알림의 수신인이 아니므로 읽을 수 없습니다.");
        }

        notification.readThis();
    }
}
