package com.nomz.doctorstudy.conference.room.signal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HeartBeatSignal implements Signal {
    private Long id;

    @Override
    public SignalType getSignalType() {
        return SignalType.HEARTBEAT;
    }
}
