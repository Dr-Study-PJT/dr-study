package com.nomz.doctorstudy.blockinterpreter;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum BlockErrorCode implements ErrorCode {
    COMMAND_BLOCK_NOT_FOUND(HttpStatus.INTERNAL_SERVER_ERROR, "명령 블록이 위치해야 합니다."),
    UNEXPECTED_TOKEN(HttpStatus.INTERNAL_SERVER_ERROR, "토큰을 해석할 수 없습니다.")
    ;

    private final HttpStatus httpStatus;
    private final String message;
}

