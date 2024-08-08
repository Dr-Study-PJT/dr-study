package com.nomz.doctorstudy.studygroup.exception;

import com.nomz.doctorstudy.common.dto.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@Slf4j
@RestControllerAdvice
public class StydyGroupExceptionHandler {

    @ExceptionHandler(StudyGroupException.class)
    public ResponseEntity<?> StudyGroupExceptionHandler(StudyGroupException e){
        log.error("StudyGroupException occurred", e);
        return new ResponseEntity<>(
                new ErrorResponse<>(e.getErrorCode().getDefaultMessage(), Map.of()), e.getErrorCode().getHttpStatus()
        );
    }

}
