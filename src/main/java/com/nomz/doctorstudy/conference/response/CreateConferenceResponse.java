package com.nomz.doctorstudy.conference.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.util.List;

@Getter
@Builder
@ToString
public class CreateConferenceResponse {
    @Schema(description = "생성된 컨퍼런스 아이디", example = "1")
    private final Long conferenceId;
}
