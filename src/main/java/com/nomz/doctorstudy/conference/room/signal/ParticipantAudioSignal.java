package com.nomz.doctorstudy.conference.room.signal;

import lombok.*;

@Getter
@Setter
public class ParticipantAudioSignal implements Signal {
    private Long id;
    private String rawAudio;

    @Override
    public SignalType getSignalType() {
        return SignalType.PARTICIPANT_AUDIO;
    }
}
