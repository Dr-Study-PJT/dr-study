package com.nomz.doctorstudy.member.exception.member;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum MemberErrorCode implements ErrorCode {
    MEMBER_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "멤버를 찾을 수 없습니다."),
    MEMBER_EMAIL_NOT_FOUND_ERROR(HttpStatus.BAD_REQUEST, "유효하지 않은 이메일입니다."),
    MEMBER_EMAIL_EXIST_ERROR(HttpStatus.BAD_REQUEST, "이미 존재하는 이메일입니다."),
    MEMBER_EMAIL_NOT_EXIST_ERROR(HttpStatus.BAD_REQUEST, "존재하지 않은 이메일입니다.")
    ;
    private final HttpStatus httpStatus;
    private final String defaultMessage;
}
