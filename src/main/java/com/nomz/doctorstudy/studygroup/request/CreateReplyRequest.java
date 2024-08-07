package com.nomz.doctorstudy.studygroup.request;

import com.nomz.doctorstudy.studygroup.Status;
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
    @NotNull(message = "처리할 스터디 그룹 아이디는 반드시 포함되어야 합니다.")
    @Schema(description = "처리할 스터디 그룹 아이디", example = "1")
    private long applyId;

    @NotNull(message = "처리할 상태는 반드시 포함되어야 합니다.")
    @Schema(description = "APPROVED / DENIED", example = "APPROVED")
    private Status status;
}
