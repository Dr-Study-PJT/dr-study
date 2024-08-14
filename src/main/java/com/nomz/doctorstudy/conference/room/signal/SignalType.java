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
    HEART_STOP("heartstop"),
    PROGRAMME("programme"),
    NEXT_STEP("next-step"),
    JOINING("joining"),
    DIALOGUE("avatar-dialogue"),
    QUIT("quit"),

    PARTICIPANT_AUDIO("participant-audio"),
    PARTICIPANT_AUDIO_TEXT("participant-audio-text"),
    HEART_BEAT("heartbeat")
    ;

    private final String token;
}
