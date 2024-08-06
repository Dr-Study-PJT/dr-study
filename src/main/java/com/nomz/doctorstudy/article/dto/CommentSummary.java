package com.nomz.doctorstudy.article.dto;

import com.nomz.doctorstudy.member.response.MemberInfo;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class CommentSummary {
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    private MemberInfo memberInfo;
}
