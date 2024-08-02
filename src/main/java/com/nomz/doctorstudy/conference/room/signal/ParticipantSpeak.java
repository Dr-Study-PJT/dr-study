package com.nomz.doctorstudy.conference.room.signal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantSpeak implements Signal {
    private Long id;
    private Integer time;

    @Override
    public SignalType getSignalType() {
        return SignalType.MUTE;
    }
}
