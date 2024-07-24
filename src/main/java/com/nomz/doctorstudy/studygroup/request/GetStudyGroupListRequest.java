package com.nomz.doctorstudy.studygroup.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetStudyGroupListRequest {
    private final String name;
    private final Integer memberCapacity;
    private final String tagName;
}
