package com.nomz.doctorstudy.studygroup.response;

import com.nomz.doctorstudy.member.response.MemberInfo;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupApply;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetApplicantListResponse {
    @Schema(description = "신청 대기자")
    private final MemberInfo applicant;

    @Schema(description = "그룹 아이디", example = "1")
    private final Long groupId;

    @Schema(description = "그룹 이름", example = "정처기 스터디")
    private final String groupName;

    @Schema(description = "그룹 가입 지원 시각", example = "2024-07-31")
    private LocalDateTime createdAt;

    @Schema(description = "그룹 가입 메시지", example = "가입 신청합니다.")
    private String applyMessage;

    public static GetApplicantListResponse of(MemberStudyGroupApply memberStudyGroupApply) {
        return builder()
                .applicant(MemberInfo.of(memberStudyGroupApply.getApplicant()))
                .groupId(memberStudyGroupApply.getStudyGroup().getId())
                .groupName(memberStudyGroupApply.getStudyGroup().getName())
                .createdAt(memberStudyGroupApply.getCreatedAt())
                .applyMessage(memberStudyGroupApply.getApplyMessage())
                .build();
    }
}
