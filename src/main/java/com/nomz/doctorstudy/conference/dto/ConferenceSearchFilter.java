package com.nomz.doctorstudy.conference.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ConferenceSearchFilter {
    private Long memberId;
    private Long studyGroupId;
    private LocalDateTime lowerBoundDate;
    private LocalDateTime upperBoundDate;
}
