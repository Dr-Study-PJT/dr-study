package com.nomz.doctorstudy.conference;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class QuitMemberInfo {
    private final long conferenceId;
    private final long memberId;
}
