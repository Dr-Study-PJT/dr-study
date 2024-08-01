package com.nomz.doctorstudy.conference.room;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.web.socket.BinaryMessage;

@Getter
@Setter
@ToString
public class Signal {
    private Long senderId;
    private String signal;
    private String rawAudio;
}
