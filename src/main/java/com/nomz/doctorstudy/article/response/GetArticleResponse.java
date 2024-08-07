package com.nomz.doctorstudy.article.response;

import com.nomz.doctorstudy.article.dto.CommentSummary;
import com.nomz.doctorstudy.article.entity.Article;
import com.nomz.doctorstudy.member.response.MemberInfo;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class GetArticleResponse {
    @Schema(description = "조회된 게시글 아이디", example = "1")
    private Long id;

    @Schema(description = "조회된 게시글 제목", example = "가입 인사글")
    private String title;

    @Schema(description = "조회된 게시글 내용", example = "안녕하세요")
    private String content;

    @Schema(description = "조회된 게시글 생성일시", example = "2024-08-02")
    private LocalDateTime createdAt;

    @Schema(description = "조회된 게시글 조회수", example = "1")
    private Long viewCount;

    @Schema(description = "조회된 게시글 작성자 정보")
    private MemberInfo memberInfo;

    @Schema(description = "조회된 게시글 댓글 리스트", example = "[]")
    private List<CommentSummary> comments;

    @Schema(description = "태그 리스트", example = "[\"#공지사항\", \"#필독\"]")
    private List<String> tags;

    public static GetArticleResponse of(Article article){
        List<String> tagNames = article.getArticleTags().stream()
                .map(articleTag -> articleTag.getTag().getName())
                .collect(Collectors.toList());

        List<CommentSummary> commentSummaries = article.getComments().stream()
                .map(comment -> CommentSummary.builder()
                        .id(comment.getId())
                        .content(comment.getContent())
                        .memberInfo(MemberInfo.of(comment.getMember()))
                        .createdAt(comment.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

        return builder()
                .id(article.getId())
                .title(article.getTitle())
                .content(article.getContent())
                .createdAt(article.getCreatedAt())
                .viewCount(article.getViewCount())
                .memberInfo(MemberInfo.of(article.getWriter()))
                .comments(commentSummaries)
                .tags(tagNames)
                .build();
    }
}



