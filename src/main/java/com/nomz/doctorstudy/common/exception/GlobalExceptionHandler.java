package com.nomz.doctorstudy.common.exception;

import com.nomz.doctorstudy.common.dto.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.security.sasl.AuthenticationException;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler
    public ResponseEntity<?> handleCustomException(BusinessException ex) {
        return new ResponseEntity<>(
                new ErrorResponse<>(
                        ex.getErrorCode().getMessage(),
                        Map.of()
                ),
                ex.getErrorCode().getHttpStatus()
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

//    @ExceptionHandler
//    public ResponseEntity<?> handleException(Exception e) {
//        return ResponseEntity.internalServerError()
//                .body(new ErrorResponse<>(
//                        "죄송합니다. 서버 내부에 오류가 발생했습니다.",
//                        Map.of()
//                ));
//    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<?> handleAuthenticationException(AuthenticationException e) {
//        Map<String, Object> errors = new LinkedHashMap<>();
//        for (FieldError fieldError : e.) {
//            errors.put(fieldError.getField(), fieldError.getDefaultMessage());
//        }

        return ResponseEntity.status(401).body("로그인을 부탁합니다이");
    }
}