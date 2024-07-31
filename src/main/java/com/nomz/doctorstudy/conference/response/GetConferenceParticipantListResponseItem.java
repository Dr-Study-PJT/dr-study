package com.nomz.doctorstudy.conference.response;

import com.nomz.doctorstudy.member.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetConferenceParticipantListResponseItem {
    @Schema(description = "참여자 아이디", example = "1")
    private final Long id;
    
    @Schema(description = "참여자 이메일", example = "abc@gmail.com")
    private final String email;
    
    @Schema(description = "참여자 닉네임", example = "good guy")
    private final String nickname;
    
    @Schema(description = "참여자 이미지 아이디", example = "1")
    private final Long imageId;

    public static GetConferenceParticipantListResponseItem of(Member member) {
        return  GetConferenceParticipantListResponseItem.builder()
                .id(member.getId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .imageId(member.getImageId())
                .build();
    }
}
