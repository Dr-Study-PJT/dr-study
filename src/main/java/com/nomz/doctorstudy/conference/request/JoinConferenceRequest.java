package com.nomz.doctorstudy.conference.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class JoinConferenceRequest {
    @NotBlank(message = "Peer 아이디를 포함시켜야 합니다.")
    @Schema(description = "Peer 아이디", example = "637e8b8-06dc-42c7-81c3-b9ccc89e7a31")
    private String peerId;

    @JsonCreator
    public JoinConferenceRequest(@JsonProperty String peerId) {
        this.peerId = peerId;
    }
}
