package com.nomz.doctorstudy.conference;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ConferenceErrorCode implements ErrorCode {
    CONFERENCE_NOT_OPENED(HttpStatus.BAD_REQUEST, "개최된 Conference가 아닙니다."),
    CONFERENCE_NOT_CLOSED(HttpStatus.BAD_REQUEST, "폐회된 Conference가 아닙니다."),
    CONFERENCE_NOT_STARTED(HttpStatus.BAD_REQUEST, "시작된 Conference가 아닙니다."),
    CONFERENCE_NOT_FINISHED(HttpStatus.BAD_REQUEST, "종료된 Conference가 아닙니다."),
    
    CONFERENCE_ALREADY_OPENED(HttpStatus.BAD_REQUEST, "이미 개최된 Conference입니다."),
    CONFERENCE_ALREADY_CLOSED(HttpStatus.BAD_REQUEST, "이미 폐회된 Conference입니다."),
    CONFERENCE_ALREADY_STARTED(HttpStatus.BAD_REQUEST, "이미 시작된 Conference입니다."),
    CONFERENCE_ALREADY_FINISHED(HttpStatus.BAD_REQUEST, "이미 종료된 Conference입니다."),

    CONFERENCE_ALREADY_JOINED(HttpStatus.BAD_REQUEST, "Conference에 이미 참여중인 멤버입니다."),
    CONFERENCE_NOT_JOINED(HttpStatus.BAD_REQUEST, "Conference에 참여중인 멤버가 아닙니다ㅣ."),
    CONFERENCE_NOT_INVITED(HttpStatus.FORBIDDEN, "Conference에 초대받지 않은 멤버입니다."),
    CONFERENCE_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "해당하는 Conference를 찾을 수 없습니다.")
    ;

    private final HttpStatus httpStatus;
    private final String defaultMessage;
}
