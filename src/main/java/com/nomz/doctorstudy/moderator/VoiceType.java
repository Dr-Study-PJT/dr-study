package com.nomz.doctorstudy.moderator;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum VoiceType {
    MEN_HIGH("fable", "A"),
    MEN_LOW("onyx", "B"),
    WOMEN_HIGH("nova", "C")
    ;

    private final String token;
    private final String code;
}
