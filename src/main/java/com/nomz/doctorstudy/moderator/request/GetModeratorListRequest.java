package com.nomz.doctorstudy.moderator.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetModeratorListRequest {
    @Schema(description = "서브 카테고리 아이디", example = "1")
    private Long subCategoryId;
}
