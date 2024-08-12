package com.nomz.doctorstudy.moderator.response;

import com.nomz.doctorstudy.member.response.MemberInfo;
import com.nomz.doctorstudy.moderator.entity.Moderator;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class GetModeratorResponse {
    private final Long id;
    private final String name;
    private final String description;
    private final String prePrompt;
    private final String script;
    private final LocalDateTime createdAt;
    private final MemberInfo creator;

    public static GetModeratorResponse of(Moderator moderator) {
        return builder()
                .id(moderator.getId())
                .name(moderator.getName())
                .description(moderator.getProcessor().getDescription())
                .prePrompt(moderator.getProcessor().getPrePrompt())
                .script(moderator.getProcessor().getScript())
                .createdAt(moderator.getCreatedAt())
                .creator(MemberInfo.of(moderator.getCreator()))
                .build();
    }
}
