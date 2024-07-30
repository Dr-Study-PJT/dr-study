package com.nomz.doctorstudy.conference.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@Builder
public class GetConferenceResponse {
    @Schema(description = "조회된 컨퍼런스 아이디", example = "1")
    private final Long id;
    @Schema(description = "조회된 컨퍼런스 제목", example = "컨퍼런스 제목")
    private final String title;
    @Schema(description = "조회된 컨퍼런스 최대 인원수", example = "10")
    private final Integer memberCapacity;
}
