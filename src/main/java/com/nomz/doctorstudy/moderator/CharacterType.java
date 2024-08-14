package com.nomz.doctorstudy.moderator;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CharacterType {
    KIND("친절하며 예의바르며 격식있는 말투", "A"),
    FRIEND("친구같이 정겹고 친근한 말투", "B"),
    STRICT("철저하고 깐깐하며 엄격한 말투", "C")
    ;

    private final String description;
    private final String code;
}
