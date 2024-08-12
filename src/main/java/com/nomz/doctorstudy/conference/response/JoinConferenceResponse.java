package com.nomz.doctorstudy.conference.response;

import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.response.MemberInfo;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class JoinConferenceResponse {
    @Schema(description = "기존 참여자들의 멤버 아이디 목록", example = "")
    private final List<MemberInfo> existingMembers;

    @Schema(description = "기존 참여자들의 피어 아이디 목록", example = "")
    private final List<String> existingPeerIds;

    public static JoinConferenceResponse of(List<Member> member, List<String> peerId) {
        return builder()
                .existingMembers(member.stream().map(MemberInfo::of).toList())
                .existingPeerIds(peerId)
                .build();
    }
}
