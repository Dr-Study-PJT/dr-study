package com.nomz.doctorstudy.conference.room.signal;

import lombok.*;

@Getter
@RequiredArgsConstructor
public class HeartBeatSignal implements Signal {
    private final Long id;

    @Override
    public SignalType getSignalType() {
        return SignalType.HEARTBEAT;
    }
}
