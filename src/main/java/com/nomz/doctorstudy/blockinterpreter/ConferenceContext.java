package com.nomz.doctorstudy.blockinterpreter;

import com.nomz.doctorstudy.conference.room.RoomParticipantInfo;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ConferenceContext {
    private final String prePrompt;
    private final String subject;
    private final List<RoomParticipantInfo> participantInfoList;
}
