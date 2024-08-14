package com.nomz.doctorstudy.studygroup.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TagFilter {
    private final String name;
    private final int count;
}
