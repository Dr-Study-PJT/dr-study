package com.nomz.doctorstudy.conference.response;

import com.nomz.doctorstudy.moderator.entity.Moderator;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class ConferenceModeratorInfo {
    @Schema(description = "사회자 아이디", example = "1")
    private final long id;

    @Schema(description = "사회자 이름", example = "사회자 이름")
    private final String name;

    @Schema(description = "사회자 설명", example = "사회자 설명")
    private final String description;

    @Schema(description = "아바타 아이디", example = "1")
    private final long avatarId;

    @Schema(description = "아바타 모델 타입", example = "A")
    private final String avatarModelType;

    @Schema(description = "아바타 목소리 타입", example = "B")
    private final String avatarVoiceType;

    @Schema(description = "아바타 캐릭터 타입", example = "C")
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
