package com.nomz.doctorstudy.image.exception;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ImageException extends RuntimeException{
    private final ErrorCode errorCode;
}
