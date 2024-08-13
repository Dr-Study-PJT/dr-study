package com.nomz.doctorstudy.conference.room;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum RoomErrorCode implements ErrorCode {
    EXISTING_PROCESS_RUNNING(HttpStatus.INTERNAL_SERVER_ERROR, "같은 방에 기존 프로세스가 아직 진행중입니다"),
    PARTICIPANT_ALREADY_JOINED(HttpStatus.BAD_REQUEST, "이미 참여중인 멤버입니다."),
    ROOM_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, "Room을 찾을 수 없습니다.")
    ;

    private final HttpStatus httpStatus;
    private final String defaultMessage;
}
