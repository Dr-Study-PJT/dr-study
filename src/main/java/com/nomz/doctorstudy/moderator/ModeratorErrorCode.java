package com.nomz.doctorstudy.moderator;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ModeratorErrorCode implements ErrorCode {
    MODERATOR_NOT_FOUND(HttpStatus.NOT_FOUND, "해당하는 Moderator를 찾을 수 없습니다.")
    ;

    private final HttpStatus httpStatus;
    private final String defaultMessage;
}
