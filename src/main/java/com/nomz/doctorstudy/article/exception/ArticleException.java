package com.nomz.doctorstudy.article.exception;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class ArticleException extends RuntimeException{
    private final ErrorCode errorCode;
    private final String message;

    public ArticleException(ErrorCode errorCode) {
        this(errorCode, errorCode.getDefaultMessage());
    }

    public ArticleException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
        this.message = message;
    }
}
