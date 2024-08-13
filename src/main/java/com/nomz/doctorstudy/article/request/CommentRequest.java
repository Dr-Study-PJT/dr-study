package com.nomz.doctorstudy.article.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
    @NotNull(message = "댓글 내용은 반드시 포함되어야 합니다.")
    @Size(min = 1, max =256, message = "내용은 1자 이상 64자 이하여야 합니다.")
    private String content;

}
