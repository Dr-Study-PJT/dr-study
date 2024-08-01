package com.nomz.doctorstudy.studygroup.exception;

import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class StudyGroupException extends RuntimeException{
    private final ErrorCode errorCode;
}
