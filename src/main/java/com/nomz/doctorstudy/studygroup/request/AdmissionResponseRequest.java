package com.nomz.doctorstudy.studygroup.request;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@Getter
@Setter
public class AdmissionResponseRequest {
    private Long admissionId;
    private boolean approved; // true for approved, false for rejected
}
