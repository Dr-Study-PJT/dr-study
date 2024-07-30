package com.nomz.doctorstudy.studygroup;


import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor

public enum StudyGroupErrorCode implements ErrorCode {
        STUDYGROUP_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "해당 스터디그룹을 찾을 수 없습니다."),
        APPLY_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "해당 신청을 찾을 수 없습니다.");

    private final HttpStatus httpStatus;
    private final String message;
}
