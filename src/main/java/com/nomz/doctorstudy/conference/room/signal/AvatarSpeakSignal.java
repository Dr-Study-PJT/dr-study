package com.nomz.doctorstudy.conference.room.signal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AvatarSpeakSignal implements Signal {
    private Integer time;

    @Override
    public SignalType getSignalType() {
        return SignalType.AVATAR_SPEAK;
    }
}
