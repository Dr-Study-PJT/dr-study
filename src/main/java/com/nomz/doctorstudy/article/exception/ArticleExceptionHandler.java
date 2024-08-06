package com.nomz.doctorstudy.article.exception;


import com.nomz.doctorstudy.common.dto.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@Slf4j
@RestControllerAdvice
@Order(1)
public class ArticleExceptionHandler {

    @ExceptionHandler(ArticleException.class)
    public ResponseEntity<?> ArticleExceptionHandler(ArticleException e){
        log.info("study group error");
        return new ResponseEntity<>(
                new ErrorResponse<>(e.getErrorCode().getDefaultMessage(), Map.of()), e.getErrorCode().getHttpStatus()
        );
    }

}
