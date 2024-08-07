package com.nomz.doctorstudy.conference.room.signal;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class HeartStopSignal implements Signal {
    private final Long id;

    @Override
    public SignalType getSignalType() {
        return SignalType.HEART_STOP;
    }
}
