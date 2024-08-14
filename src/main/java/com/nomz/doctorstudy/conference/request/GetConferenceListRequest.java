package com.nomz.doctorstudy.conference.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetConferenceListRequest {
    @Schema(description = "멤버 아이디", example = "")
    private Long memberId;

    @Schema(description = "스터디 그룹", example = "")
    private Long studyGroupId;

    @Schema(description = "개최 여부", example = "")
    private Boolean isOpened;

    @Schema(description = "폐회 여부", example = "")
    private Boolean isClosed;

    @Schema(description = "시작 여부", example = "")
    private Boolean isStarted;

    @Schema(description = "종료 여부", example = "")
    private Boolean isFinished;
}
