package com.nomz.doctorstudy.conference.room.signal;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ParticipantAudioTextSignal implements Signal {
    private Long id;
    private String text;

    @Override
    public SignalType getSignalType() {
        return SignalType.PARTICIPANT_AUDIO_TEXT;
    }
}
