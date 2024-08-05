package com.nomz.doctorstudy.member.response;

import com.nomz.doctorstudy.member.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class MemberInfo {
    @Schema(description = "아이디", example = "1")
    private final long id;

    @Schema(description = "이메일", example = "test@example.com")
    private final String email;

    @Schema(description = "닉네임", example = "테스트 닉네임")
    private final String nickname;

    @Schema(description = "이미지 URL", example = "[Image URL]")
    private final String imageUrl;

    @Schema(description = "가입일", example = "2024-08-05T07:06:05.361Z")
    private final LocalDateTime regDate;

    @Schema(description = "탈퇴일", example = "2024-08-06T07:06:05.361Z")
    private final LocalDateTime leavedDate;

    @Schema(description = "탈퇴 여부", example = "false")
    private final boolean isLeaved;

    public static MemberInfo of(Member member) {
        return builder()
                .id(member.getId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .imageUrl(member.getImage().getImageUrl())
                .build();

    }
}
