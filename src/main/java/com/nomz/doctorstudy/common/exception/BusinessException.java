package com.nomz.doctorstudy.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

/**
 * 비즈니스 로직 진행중, 예외가 발생했을 때 던집니다.
 */
@Getter
@RequiredArgsConstructor
public class BusinessException extends RuntimeException {
    private final HttpStatus status;
    private final String message;
}