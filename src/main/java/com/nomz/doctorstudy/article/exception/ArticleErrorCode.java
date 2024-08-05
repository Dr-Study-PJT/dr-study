package com.nomz.doctorstudy.article.exception;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ArticleErrorCode implements ErrorCode {
    ARTICLE_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "해당 게시글을 찾을 수 없습니다."),
    ARTICLE_NOT_AUTHORIZED(HttpStatus.FORBIDDEN, "해당 게시물에 관한 권한이 없습니다.");

    private final HttpStatus httpStatus;
    private final String defaultMessage;
}
