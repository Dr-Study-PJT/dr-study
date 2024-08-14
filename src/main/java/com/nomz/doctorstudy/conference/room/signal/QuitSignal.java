package com.nomz.doctorstudy.conference.room.signal;

public class QuitSignal implements Signal {
    @Override
    public SignalType getSignalType() {
        return SignalType.QUIT;
    }
}
