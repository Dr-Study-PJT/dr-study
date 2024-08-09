package com.nomz.doctorstudy.blockinterpreter;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;

/**
 * 블록 로직 진행중, 예외가 발생했을 때 던집니다.
 */
@Getter
public class BlockException extends RuntimeException {
    private final ErrorCode errorCode;
    private final String message;
    private final Integer lineNumber;

    public BlockException(ErrorCode errorCode) {
        this(errorCode, errorCode.getDefaultMessage(), null, null);
    }

    public BlockException(ErrorCode errorCode, String message) {
        this(errorCode, message, null, null);
    }

    public BlockException(ErrorCode errorCode, Throwable e) {
        this(errorCode, errorCode.getDefaultMessage(), null, e);
    }

    public BlockException(ErrorCode errorCode, Integer lineNumber) {
        this(errorCode, errorCode.getDefaultMessage(), lineNumber, null);
    }

    public BlockException(ErrorCode errorCode, String message, Integer lineNumber) {
        this(errorCode, message, lineNumber, null);
    }

    public BlockException(ErrorCode errorCode, String message, Integer lineNumber, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
        this.message = message;
        this.lineNumber = lineNumber;
    }
}