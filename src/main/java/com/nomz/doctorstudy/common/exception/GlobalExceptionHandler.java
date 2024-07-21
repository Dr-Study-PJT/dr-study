package com.nomz.doctorstudy.common.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<?> handleCustomException(BusinessException ex) {
        return new ResponseEntity<>(
                new ErrorResponse<>(
                        ex.getMessage(),
                        Map.of()
                ),
                ex.getStatus()
        );
    }

    @ExceptionHandler
    public ResponseEntity<?> handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        Map<String, Object> errors = new LinkedHashMap<>();
        for (FieldError fieldError : ex.getFieldErrors()) {
            errors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        return ResponseEntity.badRequest()
                .body(new ErrorResponse<>(
                        "유효하지 않은 입력입니다.",
                                errors)
                );
    }

    @ExceptionHandler
    public ResponseEntity<?> handleException(Exception e) {
        return ResponseEntity.internalServerError()
                .body(new ErrorResponse<>(
                        "죄송합니다. 서버 내부에 오류가 발생했습니다.",
                        Map.of()
                ));
    }
}