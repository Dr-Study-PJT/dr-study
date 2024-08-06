package com.nomz.doctorstudy.article.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class CommentSummary {
    private Long id;
    private String content;
    private String authorNickname;
    private LocalDateTime createdAt;
}
