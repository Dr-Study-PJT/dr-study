package com.nomz.doctorstudy.image.exception;

import com.nomz.doctorstudy.common.dto.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
public class FileExceptionHandler {
    @ExceptionHandler(FileException.class)
    public ResponseEntity<?> imageException1(FileException e){
        log.info("Image error");
        return new ResponseEntity<>(
                new ErrorResponse<>(e.getErrorCode().getDefaultMessage(), Map.of()), e.getErrorCode().getHttpStatus()
        );
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<?> imageException2(MaxUploadSizeExceededException e){
        log.info("파일크기가 너무 커요");

        Map<String, String> map = new HashMap<>();
        map.put("message", "파일 크기가 너무 큽니다.");

        return ResponseEntity.badRequest().body(map);
    }
}
