package com.nomz.doctorstudy.member.exception.email;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class EmailException extends RuntimeException{
    private final ErrorCode errorCode;
    private final String message;

    public EmailException(ErrorCode errorCode) {
        this(errorCode, errorCode.getDefaultMessage());
    }

    public EmailException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
        this.message = message;
    }
}
