package com.nomz.doctorstudy.moderator.response;

import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.moderator.entity.Moderator;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class GetModeratorListResponseItem {
    private Long id;
    private String name;
    private Long creatorId;
    private String voiceType;
    private String characterType;
    private String modelType;

    public static GetModeratorListResponseItem of(Moderator moderator) {
        return builder()
                .id(moderator.getId())
                .name(moderator.getName())
                //TODO: 임시 멤버 null 설정 .creatorId(moderator.getCreator().getId())
                .voiceType(moderator.getAvatar().getVoiceType())
                .characterType(moderator.getAvatar().getCharacterType())
                .modelType(moderator.getAvatar().getModelType())
                .build();
    }
}
