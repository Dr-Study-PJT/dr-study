package com.nomz.doctorstudy.member.exception.auth;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum AuthErrorCode implements ErrorCode {
    AUTH_INVALID_DEV_MEMBER_ID(HttpStatus.UNAUTHORIZED, "요청 헤더의 'dev-member-id'에 멤버 아이디를 추가해주세요."),
    AUTH_INVALID_ACCESS_TOKEN(HttpStatus.UNAUTHORIZED, "엑세스 토큰이 유효하지 않습니다."),
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "로그인이 필요한 요청입니다."),
    AUTH_INVALID_ID_PASSWORD(HttpStatus.BAD_REQUEST, "아이디 또는 비밀번호가 일치하지 않습니다."),
    ;

    private final HttpStatus httpStatus;
    private final String defaultMessage;
}
