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
    
    @Schema(description = "조회 기간 하한 범위 [yyyy-MM-ddTHH:mm:ss]", example = "")
    private LocalDateTime lowerBoundDate;

    @Schema(description = "조회 기간 상한 범위 [yyyy-MM-ddTHH:mm:ss]", example = "")
    private LocalDateTime upperBoundDate;
}
