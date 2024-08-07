package com.nomz.doctorstudy.studygroup.response;

import com.nomz.doctorstudy.studygroup.ApplicationStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Getter
@RequiredArgsConstructor
public class GetApplyResponse {
    @Schema(description = "조회한 멤버 아이디", example = "1")
    private final Long memberId;

    @Schema(description = "조회한 그룹 아이디", example = "2")
    private final Long groupId;

    @Schema(description = "그룹 가입 상태", example = "APPROVED")
    private final ApplicationStatus applicationStatus;

    @Schema(description = "그룹 가입 요청 때 보낸 메시지", example = "열심히 스터디 참여하겠습니다!")
    private final String message;

    @Schema(description = "그룹 가입 신청 일시", example = "2024-07-29")
    private final LocalDateTime createdAt;
}
