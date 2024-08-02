package com.nomz.doctorstudy.conference.room.signal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantAudioSignal implements Signal {
    private Long id;
    private String rawAudio;

    @Override
    public SignalType getSignalType() {
        return SignalType.PARTICIPANT_AUDIO;
    }
}
