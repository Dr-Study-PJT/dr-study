package com.nomz.doctorstudy.conference.room.signal;

import lombok.*;

@Getter
@RequiredArgsConstructor
public class UnmuteSignal implements Signal {
    private final Long id;

    @Override
    public SignalType getSignalType() {
        return SignalType.UNMUTE;
    }
}
