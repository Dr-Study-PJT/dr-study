package com.nomz.doctorstudy.member.exception.email;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum EmailErrorCode implements ErrorCode {
    NO_MATCH_VERIFY_NUMBER_ERROR(HttpStatus.BAD_REQUEST, "인증번호가 일치하지 않습니다."),
    RETRY_EMAIL_VERIFY_NUMBER_ERROR(HttpStatus.BAD_REQUEST, "인증번호를 다시 요청해주세요"),
    NO_VALID_RESET_PASSWORD_EMAIL(HttpStatus.BAD_REQUEST, "만료된 링크이거나 잘못된 링크입니다."),
    ;
    private final HttpStatus httpStatus;
    private final String message;
}
