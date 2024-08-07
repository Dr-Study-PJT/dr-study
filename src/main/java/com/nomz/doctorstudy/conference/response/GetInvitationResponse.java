package com.nomz.doctorstudy.conference.response;

import com.nomz.doctorstudy.conference.entity.ConferenceMemberInvite;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetInvitationResponse {
    @Schema(description = "컨퍼런스 아이디", example = "2")
    private final Long conferenceId;
    
    @Schema(description = "초대 받은 멤버 아이디", example = "1")
    private final Long memberId;

    @Schema(description = "초대 일시", example = "2024-08-07T11:09:32.483173")
    private final LocalDateTime createdAt;

    public static GetInvitationResponse of(ConferenceMemberInvite invitation) {
        return GetInvitationResponse.builder()
                .conferenceId(invitation.getConference().getId())
                .memberId(invitation.getMember().getId())
                .createdAt(invitation.getCreatedAt())
                .build();
    }
}
