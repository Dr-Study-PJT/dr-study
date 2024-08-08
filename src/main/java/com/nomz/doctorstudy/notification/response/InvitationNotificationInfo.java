package com.nomz.doctorstudy.notification.response;

import com.nomz.doctorstudy.conference.entity.ConferenceMemberInvite;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class InvitationNotificationInfo {
    @Schema(description = "컨퍼런스 아이디")
    private Long conferenceId;

    @Schema(description = "그룹 아이디")
    private Long groupId;

    @Schema(description = "컨퍼런스 제목")
    private String title;

    public static InvitationNotificationInfo of(ConferenceMemberInvite invitation) {
        return builder()
                .conferenceId(invitation.getConference().getId())
                .groupId(invitation.getConference().getStudyGroup().getId())
                .title(invitation.getConference().getTitle())
                .build();
    }
}
