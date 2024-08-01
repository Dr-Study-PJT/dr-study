package com.nomz.doctorstudy.article.controller;

import com.nomz.doctorstudy.article.entity.Article;
import com.nomz.doctorstudy.article.request.CreateArticleRequest;
import com.nomz.doctorstudy.article.response.CreateArticleResponse;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<SuccessResponse<CreateArticleResponse>> createArticle(@RequestBody CreateArticleRequest request, Authentication authentication) {
        Article createdArticle = articleService.createArticle(request, authentication);
        CreateArticleResponse response = new CreateArticleResponse(createdArticle.getId());
        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Article 생성에 성공했습니다.",
                        response
                )
        );
    }



}
