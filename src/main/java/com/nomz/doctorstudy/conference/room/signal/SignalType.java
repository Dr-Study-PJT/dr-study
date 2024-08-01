package com.nomz.doctorstudy.conference.room.signal;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SignalType {
    MUTE("mute"),
    UNMUTE("unmute"),
    PARTICIPANT_SPEAK_ORDER("participant-speak-order"),
    AVATAR_SPEAK_ORDER("avatar-speak-order"),
    GPT_SUMMARY("gpt-summary"),

    PARTICIPANT_SPEAK_ANSWER("participant-speak-answer")

    ;

    private final String token;
}
