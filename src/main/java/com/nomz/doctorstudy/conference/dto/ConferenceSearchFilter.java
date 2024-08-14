package com.nomz.doctorstudy.conference.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ConferenceSearchFilter {
    private Long memberId;
    private Long studyGroupId;
    private Boolean isOpened;
    private Boolean isClosed;
    private Boolean isStarted;
    private Boolean isFinished;
    private LocalDateTime lowerBoundTime;
    private LocalDateTime upperBoundTime;
}
