package com.nomz.doctorstudy.conference.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class GetConferenceListRequest {
    private final String title;
    private final Integer memberCapacity;
}
