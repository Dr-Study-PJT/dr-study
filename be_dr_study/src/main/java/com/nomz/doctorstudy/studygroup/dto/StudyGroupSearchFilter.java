package com.nomz.doctorstudy.studygroup.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class StudyGroupSearchFilter {
    private final Long memberId;
    private final String name;
    private final String tagName;
}
