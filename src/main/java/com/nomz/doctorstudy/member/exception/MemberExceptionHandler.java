package com.nomz.doctorstudy.member.exception;

import com.nomz.doctorstudy.common.dto.ErrorResponse;
import com.nomz.doctorstudy.member.exception.auth.AuthException;
import com.nomz.doctorstudy.member.exception.email.EmailException;
import com.nomz.doctorstudy.member.exception.member.MemberException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@Slf4j
@RestControllerAdvice
public class MemberExceptionHandler {

    @ExceptionHandler(MemberException.class)
    public ResponseEntity<?> MemberExceptionHandler1(MemberException e){
        log.info("member error");
        return new ResponseEntity<>(
                new ErrorResponse<>(e.getErrorCode().getDefaultMessage(), Map.of()), e.getErrorCode().getHttpStatus()
        );
    }

    @ExceptionHandler(AuthException.class)
    public ResponseEntity<?> AuthExceptionHandler(AuthException e){
        log.info("Auth error");
        return new ResponseEntity<>(
                new ErrorResponse<>(e.getErrorCode().getDefaultMessage(), Map.of()), e.getErrorCode().getHttpStatus()
        );
    }

    @ExceptionHandler(EmailException.class)
    public ResponseEntity<?> EmailExceptionHandler(EmailException e){
        log.info("email error");
        return new ResponseEntity<>(
                new ErrorResponse<>(e.getErrorCode().getDefaultMessage(), Map.of()), e.getErrorCode().getHttpStatus()
        );
    }

}
