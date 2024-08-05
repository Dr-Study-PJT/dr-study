package com.nomz.doctorstudy.conference;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ConferenceErrorCode implements ErrorCode {
    CONFERENCE_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "해당하는 Conference를 찾을 수 없습니다."),
    CONFERENCE_NOT_IN_PROCESS(HttpStatus.BAD_REQUEST, "진행중인 Conference가 아닙니다."),
    CONFERENCE_ALREADY_OPENED(HttpStatus.BAD_REQUEST, "이미 개최된 Conference입니다.")
    ;

    private final HttpStatus httpStatus;
    private final String defaultMessage;
}
