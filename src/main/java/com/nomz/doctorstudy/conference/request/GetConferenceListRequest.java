package com.nomz.doctorstudy.conference.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetConferenceListRequest {
    @Schema(description = "멤버 아이디", example = "")
    private Long memberId;

    @Schema(description = "스터디 그룹", example = "")
    private Long studyGroupId;

    @Schema(description = "시작 여부", example = "")
    private Boolean isStarted;

    @Schema(description = "종료 여부", example = "")
    private Boolean isFinished;

    @Schema(description = "메인 카테고리 아이디")
    private String mainCategory;

    @Schema(description = "서브 카테고리 아이디")
    private String subCategory;
}
