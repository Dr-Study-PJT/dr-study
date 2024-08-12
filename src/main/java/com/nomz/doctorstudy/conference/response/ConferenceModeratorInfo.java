package com.nomz.doctorstudy.conference.response;

import com.nomz.doctorstudy.moderator.entity.Moderator;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class ConferenceModeratorInfo {
    private final long id;
    private final String name;
    private final String description;
    private final long avatarId;
    private final String avatarModelType;
    private final String avatarVoiceType;
    private final String avatarCharacterType;

    public static ConferenceModeratorInfo of(Moderator moderator) {
        return builder()
                .id(moderator.getId())
                .name(moderator.getName())
                .description(moderator.getProcessor().getDescription())
                .avatarId(moderator.getAvatar().getId())
                .avatarModelType(moderator.getAvatar().getModelType())
                .avatarVoiceType(moderator.getAvatar().getVoiceType())
                .avatarCharacterType(moderator.getAvatar().getCharacterType())
                .build();
    }
}
