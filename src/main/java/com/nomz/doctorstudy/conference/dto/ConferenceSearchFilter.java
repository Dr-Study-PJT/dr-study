package com.nomz.doctorstudy.conference.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ConferenceSearchFilter {
    private final String title;
    private final Integer memberCapacity;
    private final Boolean isFinished;
}
