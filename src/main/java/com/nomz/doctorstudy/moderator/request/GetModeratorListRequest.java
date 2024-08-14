package com.nomz.doctorstudy.moderator.request;

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
public class GetModeratorListRequest {
    @Schema(description = "이름", example = "사회자")
    private String name;

    @Schema(description = "설명", example = "수행")
    private String description;

    @Schema(description = "최대 조회 개수", example = "5")
    private Integer count;
}
