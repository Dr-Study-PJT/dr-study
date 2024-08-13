package com.nomz.doctorstudy.article.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CreateArticleRequest {

    @Size(min = 1, max =256, message = "제목은 1자 이상 64자 이하여야 합니다.")
    @Schema(description = "게시글 제목", example = "정보처리기사 스터디 공지사항입니다.")
    @NotNull(message = "게시글 제목은 반드시 포함되어야 합니다.")
    private String title;

    @Size(min = 1, max =256, message = "본문은 1자 이상 256자 이하여야 합니다.")
    @Schema(description = "게시글 본문", example = "8월 16일 스터디 진행합니다.")
    @NotNull(message = "게시글 본문은 반드시 포함되어야 합니다.")
    private String content;

    @Schema(description = "태그", example = "[\"#공지사항\", \"#필독\"]")
    private List<String> tags;
}
