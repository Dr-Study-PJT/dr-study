package com.nomz.doctorstudy.conference.room;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class ParticipantInfo {
    private final String name;
    private final String peerId;
}
