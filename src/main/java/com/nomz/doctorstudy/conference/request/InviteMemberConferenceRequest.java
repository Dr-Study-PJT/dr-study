package com.nomz.doctorstudy.conference.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InviteMemberConferenceRequest {
    @Schema(description = "초대할 멤버 아이디", example = "1")
    private Long inviteeId;
}
