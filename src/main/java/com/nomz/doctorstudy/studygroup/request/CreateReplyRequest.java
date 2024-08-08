package com.nomz.doctorstudy.studygroup.request;

import com.nomz.doctorstudy.studygroup.ApplicationStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateReplyRequest {
    @NotNull(message = "처리할 상태는 반드시 포함되어야 합니다.")
    @Schema(description = "APPROVED / DENIED", example = "APPROVED")
    private ApplicationStatus applicationStatus;
    
    @Schema(description = "지원 응답 메시지", example = "귀하는 정보처리기사 응시 자격이 없으므로 가입을 거절합니다.")
    private String replyMessage;
}
