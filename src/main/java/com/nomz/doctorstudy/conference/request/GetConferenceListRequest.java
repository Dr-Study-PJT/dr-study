package com.nomz.doctorstudy.conference.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetConferenceListRequest {
    private final String title;
    private final Integer memberCapacity;
}
