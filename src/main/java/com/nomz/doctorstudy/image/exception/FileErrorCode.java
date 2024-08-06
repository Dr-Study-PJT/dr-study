package com.nomz.doctorstudy.image.exception;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum FileErrorCode implements ErrorCode{
    IMAGE_NOT_FOUND(HttpStatus.BAD_REQUEST, "이미지가 없습니다."),
    NO_ACCESS_FILE_EXTENSION(HttpStatus.BAD_REQUEST, "허용되지 않은 파일 확장자입니다."),
    IMAGE_DOWNLOAD_FAIL(HttpStatus.BAD_REQUEST, "해당 이미지가 업습니다."),
    IMAGE_UPLOAD_MAXSIZE_EXCEED(HttpStatus.BAD_REQUEST, "이미지 크기를 초과했습니다."),

    FILE_NOT_FOUND(HttpStatus.BAD_REQUEST, "파일이 없습니다."),
    IMAGE_UPLOAD_FAIL(HttpStatus.BAD_REQUEST, "이미지 업로드에 실패했습니다."),
    MEDIA_UPLOAD_FAIL(HttpStatus.BAD_REQUEST, "mp3 또는 mp4 업로드에 실패했습니다."),

    ;

    private final HttpStatus httpStatus;
    private final String defaultMessage;
}
