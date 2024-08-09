package com.nomz.doctorstudy.member.exception.member;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class MemberException extends RuntimeException  {
    private final ErrorCode errorCode;
    private final String message;

    public MemberException(ErrorCode errorCode) {
        this(errorCode, errorCode.getDefaultMessage());
    }

    public MemberException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
        this.message = message;
    }
}
