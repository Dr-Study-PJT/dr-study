package com.nomz.doctorstudy.conference.room.signal;

import lombok.*;

@Getter
@RequiredArgsConstructor
public class ParticipantSpeakSignal implements Signal {
    private final Long id;
    private final Integer time;

    @Override
    public SignalType getSignalType() {
        return SignalType.PARTICIPANT_SPEAK;
    }
}
