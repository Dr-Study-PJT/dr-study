package com.nomz.doctorstudy.conference.room;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class WebSocketSessionData {
    private final long roomId;
    private final long memberId;
}