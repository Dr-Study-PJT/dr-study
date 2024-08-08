package com.nomz.doctorstudy.member.exception.auth;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum AuthErrorCode implements ErrorCode {
    AUTH_INVALID_DEV_MEMBER_ID(HttpStatus.UNAUTHORIZED, "요청 헤더의 'dev-member-id'에 멤버 아이디를 추가해주세요."),
    AUTH_NOT_VALID_ACCESS_TOKEN(HttpStatus.UNAUTHORIZED, "엑세스 토큰이 유효하지 않습니다"),
    AUTH_NOT_VALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, "다시 로그인해주세요"),
    AUTH_INVALID_ID_PASSWORD(HttpStatus.BAD_REQUEST, "아이디 또는 비밀번호가 일치하지 않습니다."),
    INVALID_PASSWORD_EXCEPTION(HttpStatus.BAD_REQUEST, "비밀번호가 올바르지 않습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String defaultMessage;
}
