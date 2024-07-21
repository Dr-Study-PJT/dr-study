package com.nomz.doctorstudy.conference.response;

import com.nomz.doctorstudy.conference.Conference;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetConferenceListResponse {
    @Schema(description = "조회된 컨퍼런스 아이디", example = "1")
    private final Long id;
    @Schema(description = "조회된 컨퍼런스 제목", example = "컨퍼런스 제목")
    private final String title;
    @Schema(description = "조회된 컨퍼런스 최대 인원수", example = "10")
    private final Integer memberCapacity;

    public static GetConferenceListResponse of(Conference conference) {
        return builder()
                .id(conference.getId())
                .title(conference.getTitle())
                .memberCapacity(conference.getMemberCapacity())
                .build();
    }
}
