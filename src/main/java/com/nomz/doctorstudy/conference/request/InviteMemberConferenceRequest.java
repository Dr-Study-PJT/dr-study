package com.nomz.doctorstudy.conference.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class InviteMemberConferenceRequest {
    private final Long inviteeId;
}
