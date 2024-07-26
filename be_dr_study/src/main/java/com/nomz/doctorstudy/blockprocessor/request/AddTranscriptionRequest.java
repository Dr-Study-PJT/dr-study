package com.nomz.doctorstudy.blockprocessor.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class AddTranscriptionRequest {
    private final Long conferenceId;
    private final String transcription;
}