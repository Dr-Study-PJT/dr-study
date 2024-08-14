package com.nomz.doctorstudy.blockinterpreter;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class Transcript {
    private final String speakerName;
    private final int phase;
    private final String content;

    public String getSpeakerNameAndContent() {
        return String.format("발화자=%s, 발화내용=%s", speakerName, content);
    }
}
