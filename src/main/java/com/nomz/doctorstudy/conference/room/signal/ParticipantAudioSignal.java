package com.nomz.doctorstudy.conference.room.signal;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ParticipantAudioSignal implements Signal {
    private Long id;
    private String rawAudio;
}
