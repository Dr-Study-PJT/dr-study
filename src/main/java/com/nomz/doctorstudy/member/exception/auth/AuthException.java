package com.nomz.doctorstudy.member.exception.auth;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class AuthException extends RuntimeException{
    private final ErrorCode errorCode;
    private final String message;

    public AuthException(ErrorCode errorCode) {
        this(errorCode, errorCode.getDefaultMessage());
    }

    public AuthException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
        this.message = message;
    }
}
