package com.nomz.doctorstudy.conference.room.signal;

import lombok.Getter;

@Getter
public class NextStepSignal implements Signal {
    @Override
    public SignalType getSignalType() {
        return SignalType.NEXT_STEP;
    }
}
