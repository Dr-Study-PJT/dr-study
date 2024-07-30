package com.nomz.doctorstudy.studygroup.request;

import com.nomz.doctorstudy.studygroup.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateReplyRequest {
    private long applyId;
    private Status status;
}
