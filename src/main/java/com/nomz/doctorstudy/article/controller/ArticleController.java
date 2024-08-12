package com.nomz.doctorstudy.article.controller;

import com.nomz.doctorstudy.article.dto.CommentSummary;
import com.nomz.doctorstudy.article.entity.Article;
import com.nomz.doctorstudy.article.entity.Comment;
import com.nomz.doctorstudy.article.request.CommentRequest;
import com.nomz.doctorstudy.article.request.CreateArticleRequest;
import com.nomz.doctorstudy.article.request.UpdateArticleRequest;
import com.nomz.doctorstudy.article.response.ArticleResponse;
import com.nomz.doctorstudy.article.response.CommentResponse;
import com.nomz.doctorstudy.article.response.GetArticleResponse;
import com.nomz.doctorstudy.article.service.ArticleService;
import com.nomz.doctorstudy.common.dto.ErrorResponse;
import com.nomz.doctorstudy.common.dto.SuccessResponse;
import com.nomz.doctorstudy.member.Login;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.response.MemberInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Validated
@RestController
@RequestMapping("/v1/articles")
@RequiredArgsConstructor
@Tag(name="Article API", description = "Article API 입니다.")
public class ArticleController {

    private final ArticleService articleService;

    @PostMapping("/{groupId}")
    @Operation(summary = "Article 생성", description = "Article을 생성합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Article 생성 성공"),
            @ApiResponse(responseCode = "400", description = "유효하지 않은 입력", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "유효하지 않은 입력입니다.",
                        "errors": {
                            "title": "제목은 1자이상 64자 이하여야 합니다.",
                            "content": "본문을 입력하세요."
                        }
                    }
                    """))),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "인증에 실패했습니다.",
                        "errors": { }
                    }
                    """)))

    })
    public ResponseEntity<SuccessResponse<ArticleResponse>> createArticle(
            @PathVariable("groupId") Long groupId,
            @RequestBody CreateArticleRequest request,
            @Parameter(hidden = true) @Login Member requester) {
        Article createdArticle = articleService.createArticle(groupId, request, requester);
        ArticleResponse response = new ArticleResponse(createdArticle.getId());
        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Article 생성에 성공했습니다.",
                        response
                )
        );
    }

    @PatchMapping("/{articleId}")
    @Operation(summary = "Article 수정", description = "Article을 수정합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Article 수정 성공"),
            @ApiResponse(responseCode = "400", description = "유효하지 않은 입력", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "유효하지 않은 입력입니다.",
                        "errors": {
                            "title": "제목은 1자이상 64자 이하여야 합니다.",
                            "content": "본문을 입력하세요."
                        }
                    }
                    """))),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "인증에 실패했습니다.",
                        "errors": { }
                    }
                    """)))

    })
    public ResponseEntity<SuccessResponse<ArticleResponse>> updateArticle(@PathVariable("articleId") Long articleId,
                                                                          @RequestBody UpdateArticleRequest request,
                                                                          @Parameter(hidden = true) @Login Member requester){
        Article updatedArticle = articleService.updateArticle(articleId, request, requester);
        ArticleResponse response = new ArticleResponse(updatedArticle.getId());
        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Article 수정에 성공했습니다.",
                        response
                )
        );
    }

    @GetMapping("/{articleId}")
    @Operation(summary = "Article 조회", description = "Article을 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Article 조회 성공"),
            @ApiResponse(responseCode = "400", description = "유효하지 않은 입력", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "유효하지 않은 입력입니다.",
                        "errors": {
                            "title": "제목은 1자이상 64자 이하여야 합니다.",
                            "content": "본문을 입력하세요."
                        }
                    }
                    """))),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "인증에 실패했습니다.",
                        "errors": { }
                    }
                    """)))

    })
    public ResponseEntity<SuccessResponse<GetArticleResponse>> getArticle(@PathVariable("articleId") Long articleId){
        Article article = articleService.getArticle(articleId);

        List<String> tags = article.getArticleTags().stream()
                .map(articleTag -> articleTag.getTag().getName())
                .collect(Collectors.toList());

        List<CommentSummary> commentSummaries = article.getComments().stream()
                .filter(comment -> !comment.getIsDeleted())
                .map(comment -> CommentSummary.builder()
                        .id(comment.getId())
                        .content(comment.getContent())
                        .createdAt(comment.getCreatedAt())
                        .isEdited(comment.getIsEdited())
                        .memberInfo(MemberInfo.of(comment.getMember()))
                        .build())
                .collect(Collectors.toList());

        GetArticleResponse response = GetArticleResponse.builder()
                .id(article.getId())
                .title(article.getTitle())
                .content(article.getContent())
                .createdAt(article.getCreatedAt())
                .viewCount(article.getViewCount())
                .isEdited(article.getIsEdited())
                .memberInfo(MemberInfo.of(article.getWriter()))
                .comments(commentSummaries)
                .tags(tags)
                .build();

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Article 조회에 성공했습니다.",
                        response
                )
        );
    }

    @DeleteMapping("/{articleId}")
    @Operation(summary = "Article 삭제(소프트 삭제)", description = "Article을 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Article 삭제 성공"),
            @ApiResponse(responseCode = "400", description = "유효하지 않은 입력", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "유효하지 않은 입력입니다.",
                        "errors": {
                            "title": "제목은 1자이상 64자 이하여야 합니다.",
                            "content": "본문을 입력하세요."
                        }
                    }
                    """))),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "인증에 실패했습니다.",
                        "errors": { }
                    }
                    """)))

    })
    public ResponseEntity<SuccessResponse<ArticleResponse>> deleteArticle(@PathVariable("articleId") Long articleId,
                                                                          @Parameter(hidden = true) @Login Member requester){
        Article article = articleService.deleteArticle(articleId, requester);
        ArticleResponse response = new ArticleResponse(article.getId());
        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Article 삭제에 성공했습니다.",
                        response
                )
        );
    }

    @GetMapping("/groups/{groupId}")
    @Operation(summary = "Study Group Article List 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Article 리스트 조회 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Article 리스트 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "Article 리스트 조회에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """)))
    })
    public ResponseEntity<SuccessResponse<Page<GetArticleResponse>>> getArticleList(
            @PathVariable("groupId") Long groupId,
            @RequestParam(name="page", defaultValue = "1") int page,
            @RequestParam(name="size", defaultValue = "10") int size){
        Pageable pageable = PageRequest.of(page-1, size);
        Page<Article> articlePage = articleService.getArticleList(groupId, pageable);
        Page<GetArticleResponse> responsePage = articlePage.map(GetArticleResponse::of);
        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Article 리스트 조회에 성공했습니다.",
                        responsePage
                )
        );
    }
    @PostMapping("/{articleId}/comments")
    @Operation(summary = "Comment 작성")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Comment 작성 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Comment 작성 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "Comment 작성에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """)))
    })
    public ResponseEntity<SuccessResponse<CommentResponse>> createComment(
            @PathVariable("articleId") Long articleId,
            @RequestBody CommentRequest request,
            @Parameter(hidden = true) @Login Member requester

    ){
        Comment Createdcomment = articleService.createComment(articleId, request, requester);
        CommentResponse response = new CommentResponse(Createdcomment.getId());
        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Comment 생성에 성공했습니다.",
                        response
                )
        );

    }
    @PatchMapping("/comments/{commentId}")
    @Operation(summary = "Comment 수정")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Comment 수정 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Comment 수정 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "Comment 수정에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """)))
    })
    public ResponseEntity<SuccessResponse<CommentResponse>> updateComment(

            @PathVariable("commentId") Long commentId,
            @RequestBody CommentRequest request,
            @Parameter(hidden = true) @Login Member requester
    ){
        Comment updatedComment = articleService.updateComment(commentId, request, requester);
        CommentResponse response = new CommentResponse(updatedComment.getId());
        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Comment 수정에 성공했습니다.",
                        response
                )
        );
    }
    @DeleteMapping("/comments/{commentId}")
    @Operation(summary = "Comment 삭제(소프트 삭제)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Comment 삭제 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Comment 삭제 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "Comment 삭제에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """)))
    })
    public ResponseEntity<SuccessResponse<CommentResponse>> deleteComment(
            @PathVariable("commentId") Long commentId,
            @Parameter(hidden = true) @Login Member requester
    ){
        Comment deletedComment = articleService.deleteComment(commentId, requester);
        CommentResponse response = new CommentResponse(deletedComment.getId());
        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Comment 삭제에 성공했습니다.",
                        response
                )
        );

    }

}
