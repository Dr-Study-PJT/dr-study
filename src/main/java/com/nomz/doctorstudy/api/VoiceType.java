package com.nomz.doctorstudy.api;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum VoiceType {
    // 목소리 Types
    ROBOT("alloy"),
    MEN_MIDDLE("echo"),
    MEN_HIGH("fable"),
    MEN_LOW("onyx"),
    WOMEN_HIGH("nova"),
    WOMEN_LOW("shimmer")
    ;

    private final String token;

}
