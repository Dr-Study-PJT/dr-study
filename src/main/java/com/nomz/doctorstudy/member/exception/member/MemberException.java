package com.nomz.doctorstudy.member.exception.member;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MemberException extends RuntimeException  {
    private final ErrorCode errorCode;
}
