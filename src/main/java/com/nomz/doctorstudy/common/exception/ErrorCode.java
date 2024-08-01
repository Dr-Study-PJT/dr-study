package com.nomz.doctorstudy.common.exception;

import org.springframework.http.HttpStatus;

public interface ErrorCode {
    HttpStatus getHttpStatus();
    String getDefaultMessage();
}