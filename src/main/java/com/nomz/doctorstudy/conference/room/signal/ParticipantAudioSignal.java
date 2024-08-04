package com.nomz.doctorstudy.conference.room.signal;

import lombok.*;

@Getter
@RequiredArgsConstructor
public class ParticipantAudioSignal implements Signal {
    private final Long id;
    private final String rawAudio;

    @Override
    public SignalType getSignalType() {
        return SignalType.PARTICIPANT_AUDIO;
    }
}
