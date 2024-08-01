package com.nomz.doctorstudy.conference.room;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Signal {
    private Long senderId;
    private String signal;
    private byte[] rawAudio;
}
