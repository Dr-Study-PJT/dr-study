package com.nomz.doctorstudy.studygroup.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class CreateApplyRequest {
    private Long studyGroupId;
    private String message;
}
