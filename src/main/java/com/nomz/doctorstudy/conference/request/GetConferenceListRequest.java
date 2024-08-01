package com.nomz.doctorstudy.conference.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetConferenceListRequest {
    @Schema(description = "제목", example = "")
    private String title;

    @Schema(description = " 종료 여부 (0 or 1)", example = "")
    private Boolean isFinished;
}
