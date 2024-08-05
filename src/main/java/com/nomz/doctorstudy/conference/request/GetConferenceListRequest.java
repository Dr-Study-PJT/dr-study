package com.nomz.doctorstudy.conference.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetConferenceListRequest {
    @Schema(description = "멤버 아이디", example = "1")
    private Long memberId;

    @Schema(description = "스터디 그룹", example = "1")
    private Long studyGroupId;
    
    @Schema(description = "하한 범위", example = "2024-08-05T08:26:09.870Z")
    private LocalDateTime lowerBoundDate;

    @Schema(description = "상한 범위", example = "2024-09-15T17:34:09.870Z")
    private LocalDateTime upperBoundDate;
}
