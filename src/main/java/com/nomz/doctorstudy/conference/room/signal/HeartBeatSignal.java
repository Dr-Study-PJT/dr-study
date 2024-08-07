package com.nomz.doctorstudy.conference.room.signal;

import lombok.*;

@Getter
@Setter
public class HeartBeatSignal implements Signal {
    private Long id;

    @Override
    public SignalType getSignalType() {
        return SignalType.HEART_BEAT;
    }
}
