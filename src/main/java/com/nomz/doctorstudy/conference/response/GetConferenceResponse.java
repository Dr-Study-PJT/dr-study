package com.nomz.doctorstudy.conference.response;

import com.nomz.doctorstudy.conference.entity.Conference;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class GetConferenceResponse {
    @Schema(description = "컨퍼런스 아이디", example = "1")
    private final Long id;

    @Schema(description = "호스트 아이디", example = "1")
    private final Long hostId;

    @Schema(description = "스터디 그룹 아이디", example = "1")
    private final Long studyGroupId;

    @Schema(description = "컨퍼런스 제목", example = "컨퍼런스 제목")
    private final String title;

    @Schema(description = "컨퍼런스 주제", example = "컨퍼런스 주제")
    private final String subject;

    @Schema(description = "컨퍼런스 최대 인원수", example = "10")
    private final Integer memberCapacity;

    @Schema(description = "컨퍼런스 시작 시간", example = "2024-08-01T22:20:42.483173")
    private final LocalDateTime startTime;

    @Schema(description = "컨퍼런스 종료 시간", example = "2024-08-04T01:51:32.483173")
    private final LocalDateTime finishTime;

    @Schema(description = "컨퍼런스 이미지 URL", example = "[image URL]")
    private final String imageUrl;

    public static GetConferenceResponse of(Conference conference) {
        return builder()
                .id(conference.getId())
                //TODO: .hostId(conference.getHost().getId())
                //TODO: .studyGroupId(conference.getStudyGroup().getId())
                .title(conference.getTitle())
                .memberCapacity(conference.getMemberCapacity())
                .startTime(conference.getStartTime())
                .finishTime(conference.getFinishTime())
                .build();
    }
}
