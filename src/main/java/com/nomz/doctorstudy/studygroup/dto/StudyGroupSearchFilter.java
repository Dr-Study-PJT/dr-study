package com.nomz.doctorstudy.studygroup.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StudyGroupSearchFilter {
    private final String name;
    private final Integer memberCapacity;
    private final String tagName;
}
