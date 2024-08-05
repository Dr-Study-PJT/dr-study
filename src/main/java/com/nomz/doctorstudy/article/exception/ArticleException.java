package com.nomz.doctorstudy.article.exception;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ArticleException extends RuntimeException{
    private final ErrorCode errorCode;
}
