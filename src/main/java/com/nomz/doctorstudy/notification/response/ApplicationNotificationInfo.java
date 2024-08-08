package com.nomz.doctorstudy.notification.response;

import com.nomz.doctorstudy.member.response.MemberInfo;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupApply;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class ApplicationNotificationInfo {
    @Schema(description = "지원 이력 아이디")
    private Long applicationId;

    @Schema(description = "지원자 정보")
    private MemberInfo applicant;
    
    @Schema(description = "지원자 메시지")
    private String applyMessage;
    
    @Schema(description = "지원한 그룹 아이디")
    private Long groupId;

    @Schema(description = "지원한 그룹 이름")
    private String groupName;

    public static ApplicationNotificationInfo of(MemberStudyGroupApply application) {
        return builder()
                .applicationId(application.getId())
                .applicant(MemberInfo.of(application.getMember()))
                .applyMessage(application.getApplyMessage())
                .groupId(application.getStudyGroup().getId())
                .groupName(application.getStudyGroup().getName())
                .build();
    }
}
