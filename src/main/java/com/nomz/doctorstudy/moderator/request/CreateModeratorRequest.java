package com.nomz.doctorstudy.moderator.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class CreateModeratorRequest {
    private final String voiceType;

    private final String characterType;

    private final String modelType;

    private final String prePrompt;

    private final String script;

    private final String description;

    private final String gptKey;
}
