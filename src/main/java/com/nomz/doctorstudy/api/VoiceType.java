package com.nomz.doctorstudy.api;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum VoiceType {
    // 목소리 Types
    ROBOT("Alloy"),
    MEN_MIDDLE("Echo"),
    MEN_HIGH("Fable"),
    MEN_LOW("Onyx"),
    WOMEN_HIGH("Nova"),
    WOMEN_LOW("Shimmer")
    ;

    private final String token;

}
