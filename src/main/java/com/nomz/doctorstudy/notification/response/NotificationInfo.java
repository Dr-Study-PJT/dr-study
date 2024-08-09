package com.nomz.doctorstudy.notification.response;

import com.nomz.doctorstudy.conference.entity.ConferenceMemberInvite;
import com.nomz.doctorstudy.notification.NotificationItemType;
import com.nomz.doctorstudy.notification.entity.Notification;
import com.nomz.doctorstudy.studygroup.ApplicationStatus;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupApply;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class NotificationInfo {
    @Schema(description = "알림 아이디", example = "1")
    private final Long id;

    @Schema(description = "알림 생성 일시", example = "2024-08-06T22:46:32.483173")
    private final LocalDateTime createdAt;

    @Schema(description = "알림 이미지 URL")
    private final String imageUrl;

    @Schema(description = "알림 아이템 타입 [ StudyGroupApplication | ConferenceInvitation | StudyGroupApplicationReply ]", example = "StudyGroup")
    private final String itemType;

    @Schema(description = "알림 아이템 정보", example = "")
    private final Object itemInfo;


    public static NotificationInfo of(Notification notification, MemberStudyGroupApply application) {
        NotificationInfoBuilder builder = NotificationInfo.builder()
                .id(notification.getId())
                .createdAt(notification.getCreatedAt());

        return switch (application.getApplicationStatus()) {
            case WAITING -> builder
                    .itemType(NotificationItemType.STUDY_GROUP_APPLICATION.getToken())
                    .itemInfo(ApplicationNotificationInfo.of(application))
                    .imageUrl(application.getApplicant().getImage().getImageUrl())
                    .build();
            default -> builder
                    .itemType(NotificationItemType.STUDY_GROUP_APPLICATION_REPLY.getToken())
                    .itemInfo(ApplicationReplyNotificationInfo.of(application))
                    .imageUrl(application.getStudyGroup().getImage().getImageUrl())
                    .build();
        };
    }

    public static NotificationInfo of(Notification notification, ConferenceMemberInvite invitation) {
        return NotificationInfo.builder()
                .id(notification.getId())
                .createdAt(notification.getCreatedAt())
                .imageUrl(invitation.getConference().getImage().getImageUrl())
                .itemType(NotificationItemType.CONFERENCE_INVITATION.getToken())
                .itemInfo(InvitationNotificationInfo.of(invitation))
                .build();
    }
}
