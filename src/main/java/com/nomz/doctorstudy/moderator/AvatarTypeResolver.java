package com.nomz.doctorstudy.moderator;

import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.common.exception.CommonErrorCode;

import java.util.Map;

public class AvatarTypeResolver {
    private static final Map<String, VoiceType> voiceTypeMap= Map.of(
            "A", VoiceType.MEN_HIGH,
            "B", VoiceType.MEN_LOW,
            "C", VoiceType.WOMEN_HIGH
    );

    private static final Map<String, CharacterType> characterTypeMap = Map.of(
            "A", CharacterType.KIND,
            "B", CharacterType.FRIEND,
            "C", CharacterType.STRICT
    );

    public static VoiceType resolveVoiceType(String code) {
        return voiceTypeMap.get(code);
    }

    public static CharacterType resolveCharacterType(String code) {
        return characterTypeMap.get(code);
    }
}
