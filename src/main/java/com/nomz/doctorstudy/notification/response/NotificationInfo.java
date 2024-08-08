package com.nomz.doctorstudy.notification.response;

import com.nomz.doctorstudy.conference.entity.ConferenceMemberInvite;
import com.nomz.doctorstudy.member.response.MemberInfo;
import com.nomz.doctorstudy.notification.ConferenceNotificationItem;
import com.nomz.doctorstudy.notification.NotificationItemType;
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

    @Schema(description = "알림 아이템 타입 [ StudyGroup | Conference ]", example = "StudyGroup")
    private final String itemType;

    @Schema(description = "알림 아이템", example = "")
    private final Object item;

    public static NotificationInfo of(MemberStudyGroupApply application) {
        return NotificationInfo.builder()
                .itemType(NotificationItemType.STUDY_GROUP_APPLICATION.getToken())
                .createdAt(application.getCreatedAt())
                .item(MemberInfo.of(application.getMember()))
                .build();
    }

    public static NotificationInfo of(ConferenceMemberInvite invitation) {
        return NotificationInfo.builder()
                .itemType(NotificationItemType.CONFERENCE_INVITATION.getToken())
                .createdAt(invitation.getCreatedAt())
                .item(ConferenceNotificationItem.of(invitation.getConference()))
                .build();
    }
}
