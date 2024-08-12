package com.nomz.doctorstudy.studygroup.exception;


import com.nomz.doctorstudy.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum StudyGroupErrorCode implements ErrorCode {
        STUDYGROUP_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "해당 스터디그룹을 찾을 수 없습니다."),
        APPLY_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "해당 신청을 찾을 수 없습니다."),
        MEMBER_NOT_FOUND_ERROR(HttpStatus.NOT_FOUND, "해당 멤버를 찾을 수 없습니다."),
        STUDYGROUP_ALREADY_JOINED_ERROR(HttpStatus.CONFLICT, "이미 해당 스터디 그룹에 가입된 멤버입니다."),
        USER_NOT_GROUP_CAPTAIN(HttpStatus.NOT_FOUND, "해당 멤버는 그룹장이 아닙니다."),
        MEMBER_STUDY_GROUP_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 멤버-스터디그룹을 찾을 수 없습니다."),
        MEMBER_NOT_IN_GROUP_ERROR(HttpStatus.FORBIDDEN, "해당 멤버-스터디그룹을 찾을 수 없습니다."),
    ;
    private final HttpStatus httpStatus;
    private final String defaultMessage;
}
