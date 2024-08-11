package com.nomz.doctorstudy.conference.room;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class RoomParticipantInfo {
    private final long memberId;
    private final String name;
    private final String peerId;
}
