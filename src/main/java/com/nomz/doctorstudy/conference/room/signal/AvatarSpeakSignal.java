package com.nomz.doctorstudy.conference.room.signal;

import lombok.*;

@Getter
@RequiredArgsConstructor
public class AvatarSpeakSignal implements Signal {
    private final Integer time;
    private final String audioUrl;

    @Override
    public SignalType getSignalType() {
        return SignalType.AVATAR_SPEAK;
    }
}
