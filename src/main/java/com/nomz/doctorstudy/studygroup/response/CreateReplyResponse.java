package com.nomz.doctorstudy.studygroup.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CreateReplyResponse {
    @Schema(description = "지원 아이디", example = "1")
    private final Long applyId;

}