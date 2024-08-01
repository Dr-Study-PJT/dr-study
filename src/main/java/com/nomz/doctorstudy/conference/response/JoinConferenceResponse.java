package com.nomz.doctorstudy.conference.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class JoinConferenceResponse {
    @Schema(description = "기존 참여자들의 피어 아이디 목록", example = "")
    private final List<String> existingPeerIds;
}
