package com.nomz.doctorstudy.member.exception.auth;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class AuthException extends RuntimeException{
    private final ErrorCode errorCode;
}
