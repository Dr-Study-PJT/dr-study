package com.nomz.doctorstudy.moderator.response;

import com.nomz.doctorstudy.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetAvatarResponse {
    private Long id;
    private String name;
    private Member creator;
    private String voiceType;
    private String characterType;
    private String modelType;
}