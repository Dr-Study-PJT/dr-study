package com.nomz.doctorstudy.conference.room.signal;

import lombok.*;

@Getter
@RequiredArgsConstructor
public class MuteSignal implements Signal {
    private final Long id;

    @Override
    public SignalType getSignalType() {
        return SignalType.MUTE;
    }
}
