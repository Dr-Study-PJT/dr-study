package com.nomz.doctorstudy.moderator.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetModeratorResponse {
    private final Long creatorId;
    private final LocalDateTime createdAt;
    private final Long processorId;
    private final Long avatarId;
}
