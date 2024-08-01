package com.nomz.doctorstudy.image.exception;

import com.nomz.doctorstudy.common.dto.ErrorResponse;
import com.nomz.doctorstudy.member.exception.member.MemberException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@Slf4j
@RestControllerAdvice
public class ImageExceptionHandler {
    @ExceptionHandler(MemberException.class)
    public ResponseEntity<?> ImageExceptionHandler(MemberException e){
        log.info("Image error");
        return new ResponseEntity<>(
                new ErrorResponse<>(e.getErrorCode().getDefaultMessage(), Map.of()), e.getErrorCode().getHttpStatus()
        );
    }
}
