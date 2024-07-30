package com.nomz.doctorstudy.conference;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ConferenceErrorCode implements ErrorCode {
    CONFERENCE_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "해당하는 Conference를 찾을 수 없습니다.")
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
