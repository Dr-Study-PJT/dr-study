package com.nomz.doctorstudy.blockinterpreter;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum BlockErrorCode implements ErrorCode {
    // Process
    PROCESS_ALREADY_SLEEP(HttpStatus.INTERNAL_SERVER_ERROR, "Process가 이미 Sleep 상태입니다"),
    PROCESS_ALREADY_AWAKE(HttpStatus.INTERNAL_SERVER_ERROR, "Process가 이미 Awake 상태입니다"),
    PROCESS_INTERRUPTED(HttpStatus.INTERNAL_SERVER_ERROR, "Process가 wait 도중 Interrupt가 발생했습니다."),
    PROCESS_ALREADY_EXISTS(HttpStatus.INTERNAL_SERVER_ERROR, "Process가 이미 존재합니다."),
    PROCESS_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, "Process를 찾을 수 없습니다."),

    // Script,
    VARIABLE_ALREADY_DECLARED(HttpStatus.BAD_REQUEST, "스코프 내에 이미 같은 이름의 변수가 존재합니다."),
    TRANSCRIPT_INDEX_OUT_OF_BOUND(HttpStatus.BAD_REQUEST, "요청한 발화 내역 인덱스가 범위 밖에 있습니다."),
    VALUE_BLOCK_NOT_FOUND(HttpStatus.BAD_REQUEST, "값 블록이 위치해야 합니다."),
    COMMAND_BLOCK_NOT_FOUND(HttpStatus.BAD_REQUEST, "명령 블록이 위치해야 합니다."),
    UNEXPECTED_TOKEN(HttpStatus.BAD_REQUEST, "토큰을 해석할 수 없습니다.")
    ;

    private final HttpStatus httpStatus;
    private final String defaultMessage;
}

