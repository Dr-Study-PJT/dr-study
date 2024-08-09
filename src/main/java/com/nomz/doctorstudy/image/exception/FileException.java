package com.nomz.doctorstudy.image.exception;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class FileException extends RuntimeException{
    private final ErrorCode errorCode;
    private final String message;

    public FileException(ErrorCode errorCode) {
        this(errorCode, errorCode.getDefaultMessage());
    }

    public FileException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
        this.message = message;
    }
}
