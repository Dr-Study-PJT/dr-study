package com.nomz.doctorstudy.conference.room.signal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class HeartStopSignal implements Signal {
    private Long id;
    private String peerId;

    @Override
    public SignalType getSignalType() {
        return SignalType.HEART_STOP;
    }
}
