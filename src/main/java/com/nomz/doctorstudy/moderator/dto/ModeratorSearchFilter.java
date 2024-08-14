package com.nomz.doctorstudy.moderator.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ModeratorSearchFilter {
    private final String name;
    private final String description;
    private final int count;
}
