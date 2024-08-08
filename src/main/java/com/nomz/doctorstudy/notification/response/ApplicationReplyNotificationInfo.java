package com.nomz.doctorstudy.notification.response;

import com.nomz.doctorstudy.studygroup.ApplicationStatus;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupApply;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class ApplicationReplyNotificationInfo {
    @Schema(description = "지원 이력 아이디")
    private Long applicationId;

    @Schema(description = "가입 여부")
    private Boolean isApproved;

    @Schema(description = "지원자 답변 메시지")
    private String replyMessage;

    @Schema(description = "지원 그룹 아이디")
    private Long groupId;

    public static ApplicationReplyNotificationInfo of(MemberStudyGroupApply application) {
        return builder()
                .applicationId(application.getId())
                .isApproved(application.getApplicationStatus() == ApplicationStatus.APPROVED)
                .replyMessage(application.getReplyMessage())
                .groupId(application.getStudyGroup().getId())
                .build();
    }
}
