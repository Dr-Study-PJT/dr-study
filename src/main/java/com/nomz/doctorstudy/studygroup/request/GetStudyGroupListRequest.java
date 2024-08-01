package com.nomz.doctorstudy.studygroup.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetStudyGroupListRequest {
    private  String name;
    private  Integer memberCapacity;
    private  String tagName;
}
