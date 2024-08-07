package com.nomz.doctorstudy.article.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CommentRequest {
    @Schema(description = "댓글 내용", example = "확인했습니다!")
    private String content;

}
