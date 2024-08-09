package com.nomz.doctorstudy.studygroup.exception;

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
public class StudyGroupExceptionHandler {
    @ExceptionHandler(StudyGroupException.class)
    public ResponseEntity<?> handleStudyGroupException(StudyGroupException e){
        log.error("StudyGroupException occurred", e);
        return new ResponseEntity<>(
                new ErrorResponse<>(e.getMessage(), Map.of()), e.getErrorCode().getHttpStatus()
        );
    }

}
