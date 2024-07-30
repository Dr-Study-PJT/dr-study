package com.nomz.doctorstudy.conference.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class JoinConferenceResponse {
    private final List<String> existingPeerIds;
}
