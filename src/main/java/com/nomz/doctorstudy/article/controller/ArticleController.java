package com.nomz.doctorstudy.article.controller;

import com.nomz.doctorstudy.article.entity.Article;
import com.nomz.doctorstudy.article.request.CreateArticleRequest;
import com.nomz.doctorstudy.article.request.UpdateArticleRequest;
import com.nomz.doctorstudy.article.response.ArticleResponse;
import com.nomz.doctorstudy.article.response.GetArticleResponse;
import com.nomz.doctorstudy.article.service.ArticleService;
import com.nomz.doctorstudy.common.dto.ErrorResponse;
import com.nomz.doctorstudy.common.dto.SuccessResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Validated
@RestController
@RequestMapping("/v1/articles")
@RequiredArgsConstructor
@Tag(name="Article API", description = "Article API 입니다.")
public class ArticleController {

    private final ArticleService articleService;

    @PostMapping
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
    public ResponseEntity<SuccessResponse<ArticleResponse>> createArticle(@RequestBody CreateArticleRequest request, Authentication authentication) {
        Article createdArticle = articleService.createArticle(request, authentication);
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
    public ResponseEntity<SuccessResponse<ArticleResponse>> updateArticle(@PathVariable Long articleId, @RequestBody UpdateArticleRequest request, Authentication authentication){
        Article updatedArticle = articleService.updateArticle(articleId, request, authentication);
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
    public ResponseEntity<SuccessResponse<GetArticleResponse>> getArticle(@PathVariable Long articleId, Authentication authentication){
        Article article = articleService.getArticle(articleId, authentication);
        GetArticleResponse response = GetArticleResponse.builder()
                .title(article.getTitle())
                .content(article.getContent())
                .createdAt(article.getCreatedAt())
                .viewCount(article.getViewCount())
                .writerNickname(article.getWriter().getNickname())
                .comments(article.getComments())
                .build();

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Article 수정에 성공했습니다.",
                        response
                )
        );
    }

    @PutMapping("/{articleId}")
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
    public ResponseEntity<SuccessResponse<ArticleResponse>> deleteArticle(@PathVariable Long articleId, Authentication authentication){
        Article article = articleService.deleteArticle(articleId, authentication);
        ArticleResponse response = new ArticleResponse(article.getId());
        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Article 수정에 성공했습니다.",
                        response
                )
        );
    }
}
