package com.nomz.doctorstudy.article.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class CommentResponse {
    @Schema(description = "처리된 Comment 아이디", example = "1")
    private final Long commentId;
}
