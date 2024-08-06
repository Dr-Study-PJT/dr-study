package com.nomz.doctorstudy.conference.request;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OpenConferenceRequest {
    @NotNull(message = "AI 사회자 아이디는 반드시 포함되어야 합니다.")
    @Schema(description = "AI 사회자 아이디", example = "1")
    private Long moderatorId;
}
