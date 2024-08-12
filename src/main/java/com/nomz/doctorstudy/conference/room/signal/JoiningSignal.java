package com.nomz.doctorstudy.conference.room.signal;

import lombok.*;

@Getter
@RequiredArgsConstructor
@ToString
public class JoiningSignal implements Signal {
    private final Long id;
    private final String nickname;
    private final String imageUrl;

    @Override
    public SignalType getSignalType() {
        return SignalType.JOINING;
    }
}
