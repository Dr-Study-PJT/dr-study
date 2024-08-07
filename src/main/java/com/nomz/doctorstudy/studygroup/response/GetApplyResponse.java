package com.nomz.doctorstudy.studygroup.response;

import com.nomz.doctorstudy.studygroup.Status;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupApply;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetApplyResponse {
    @Schema(description = "조회한 멤버 아이디", example = "1")
    private final Long memberId;

    @Schema(description = "조회한 그룹 아이디", example = "2")
    private final Long groupId;

    @Schema(description = "그룹 가입 상태", example = "APPROVED")
    private final Status status;

    @Schema(description = "그룹 가입 요청 때 보낸 메시지", example = "열심히 스터디 참여하겠습니다!")
    private final String message;

    @Schema(description = "그룹 가입 신청 일시", example = "2024-07-29")
    private final LocalDateTime createdAt;

    public static GetApplyResponse of(MemberStudyGroupApply application) {
        return GetApplyResponse.builder()
                .memberId(application.getId())
                .groupId(application.getStudyGroup().getId())
                .status(application.getStatus())
                .message(application.getMessage())
                .createdAt(application.getCreatedAt())
                .build();
    }
}
