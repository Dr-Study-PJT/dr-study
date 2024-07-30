package com.nomz.doctorstudy.conference.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
public class JoinConferenceRequest {
    private final String peerId;

    @JsonCreator
    public JoinConferenceRequest(@JsonProperty String peerId) {
        this.peerId = peerId;
    }
}
