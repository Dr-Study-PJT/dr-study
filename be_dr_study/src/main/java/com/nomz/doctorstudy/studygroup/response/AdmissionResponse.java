package com.nomz.doctorstudy.studygroup.response;

import lombok.Data;

@Data
public class AdmissionResponse {
    private Long admissionId;
    private Long memberId;
    private Long studyGroupId;
    private String message;
    private boolean approved; // true for approved, false for rejected
}
