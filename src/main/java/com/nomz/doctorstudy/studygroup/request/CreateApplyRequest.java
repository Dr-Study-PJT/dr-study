package com.nomz.doctorstudy.studygroup.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class CreateApplyRequest {
    @NotNull(message = "지원할 스터디 그룹 아이디는 반드시 포함되어야 합니다.")
    @Schema(description = "지원할 스터디 그룹 아이디", example = "1")
    private Long groupId;

    @Schema(description = "지원 메시지", example = "열심히 활동하겠습니다. 뽑아주세요!!")
    private String applyMessage;
}
