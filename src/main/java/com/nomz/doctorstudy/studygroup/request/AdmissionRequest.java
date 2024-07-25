package com.nomz.doctorstudy.studygroup.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AdmissionRequest {
    private Long memberId;
    private Long studyGroupId;
    private String message;
}
