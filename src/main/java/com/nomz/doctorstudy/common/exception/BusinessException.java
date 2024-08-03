package com.nomz.doctorstudy.common.exception;

import lombok.Getter;

/**
 * 비즈니스 로직 진행중, 예외가 발생했을 때 던집니다.
 */
@Getter
public class BusinessException extends RuntimeException {
    private final ErrorCode errorCode;
    private final String message;

    public BusinessException(ErrorCode errorCode) {
        this.errorCode = errorCode;
        message = errorCode.getDefaultMessage();
    }

    public BusinessException(ErrorCode errorCode, String message) {
        this.errorCode = errorCode;
        this.message = message;
    }

    public BusinessException(ErrorCode errorCode, String message, Throwable cause) {
        super(cause);
        this.errorCode = errorCode;
        this.message = message;
    }
}