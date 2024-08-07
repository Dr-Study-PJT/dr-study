package com.nomz.doctorstudy.notification;

import com.nomz.doctorstudy.conference.entity.ConferenceMemberInvite;
import com.nomz.doctorstudy.conference.response.GetInvitationResponse;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupApply;
import com.nomz.doctorstudy.studygroup.response.GetApplyResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class GetNotificationResponse {
    @Schema(description = "알림 아이템 타입 [ StudyGroup | Conference ]", example = "StudyGroup")
    private final String notificationItemType;

    @Schema(description = "알림 생성 일시", example = "2024-08-06T22:46:32.483173")
    private final LocalDateTime createdAt;

    @Schema(description = "알림 아이템", example = "")
    private final Object notificationItem;

    public static GetNotificationResponse of(MemberStudyGroupApply application) {
        return GetNotificationResponse.builder()
                .notificationItemType(NotificationItemType.STUDY_GROUP_APPLICATION.getToken())
                .createdAt(application.getCreatedAt())
                .notificationItem(GetApplyResponse.of(application))
                .build();
    }

    public static GetNotificationResponse of(ConferenceMemberInvite invitation) {
        return GetNotificationResponse.builder()
                .notificationItemType(NotificationItemType.CONFERENCE_INVITATION.getToken())
                .createdAt(invitation.getCreatedAt())
                .notificationItem(GetInvitationResponse.of(invitation))
                .build();
    }
}
