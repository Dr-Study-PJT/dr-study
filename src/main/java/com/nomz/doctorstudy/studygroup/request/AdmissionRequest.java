package com.nomz.doctorstudy.studygroup.request;

import lombok.Data;

@Data
public class AdmissionRequest {
    private Long memberId;
    private Long studyGroupId;
    private String message;
}
