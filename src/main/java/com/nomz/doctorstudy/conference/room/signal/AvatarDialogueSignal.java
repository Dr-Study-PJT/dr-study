package com.nomz.doctorstudy.conference.room.signal;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class AvatarDialogueSignal implements Signal {
    private final String content;

    @Override
    public SignalType getSignalType() {
        return SignalType.DIALOGUE;
    }
}
