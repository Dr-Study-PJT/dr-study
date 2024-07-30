package com.nomz.doctorstudy.studygroup.request;

import lombok.Data;

@Data
public class CreateApplyRequest {
    private Long memberId;
    private Long studyGroupId;
    private String message;
}
