package com.nomz.doctorstudy.conference.room.signal;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SignalType {
    MUTE("mute"),
    UNMUTE("unmute"),
    PARTICIPANT_SPEAK("participant-speak"),
    AVATAR_SPEAK("avatar-speak"),
    GPT_SUMMARY("gpt-summary"),

    PARTICIPANT_AUDIO("participant-audio"),
    HEARTBEAT("heartbeat")
    ;

    private final String token;
}
