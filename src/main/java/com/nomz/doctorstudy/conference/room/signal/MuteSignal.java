package com.nomz.doctorstudy.conference.room.signal;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MuteSignal implements Signal {
    private Long id;

    @Override
    public SignalType getSignalType() {
        return SignalType.MUTE;
    }
}
