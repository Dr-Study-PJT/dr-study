package com.nomz.doctorstudy.conference.room;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum RoomErrorCode implements ErrorCode {
    PARTICIPANT_ALREADY_JOINED(HttpStatus.BAD_REQUEST, "이미 참여중인 멤버입니다."),
    ;

    private final HttpStatus httpStatus;
    private final String defaultMessage;
}
