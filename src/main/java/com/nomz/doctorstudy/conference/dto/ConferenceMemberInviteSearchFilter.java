package com.nomz.doctorstudy.conference.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ConferenceMemberInviteSearchFilter {
    private Long conferenceId;
    private Long inviteeId;
}
