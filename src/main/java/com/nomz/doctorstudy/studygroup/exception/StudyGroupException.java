package com.nomz.doctorstudy.studygroup.exception;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;

@Getter
public class StudyGroupException extends RuntimeException {
    private final ErrorCode errorCode;
    private final String message;

    public StudyGroupException(ErrorCode errorCode) {
        this(errorCode, errorCode.getDefaultMessage());
    }

    public StudyGroupException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
        this.message = message;
    }
}
