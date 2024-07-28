package com.nomz.doctorstudy.member.exception.email;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class EmailException extends RuntimeException{
    private final ErrorCode errorCode;
}
