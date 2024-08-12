package com.nomz.doctorstudy.conference.room.signal;

import com.nomz.doctorstudy.blockinterpreter.ProgrammeItem;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class ProgrammeSignal implements Signal {
    private final List<ProgrammeItem> programme;

    @Override
    public SignalType getSignalType() {
        return SignalType.PROGRAMME;
    }
}
