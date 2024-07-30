package com.nomz.doctorstudy.studygroup.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class CreateApplyRequest {
    private Long memberId;
    private Long studyGroupId;
    private String message;
}
