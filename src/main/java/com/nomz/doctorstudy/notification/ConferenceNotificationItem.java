package com.nomz.doctorstudy.notification;

import com.nomz.doctorstudy.conference.entity.Conference;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ConferenceNotificationItem {
    @Schema(description = "컨퍼런스 아이디", example = "1")
    private final Long conferenceId;
    
    @Schema(description = "그룹 아이디", example = "1")
    private final Long groupId;

    @Schema(description = "컨퍼런스 타이틀", example = "1")
    private final String title;

    @Schema(description = "컨퍼런스 썸네일 이미지 URL", example = "1")
    private final String imageUrl;

    public static ConferenceNotificationItem of(Conference conference) {
        return ConferenceNotificationItem.builder()
                .conferenceId(conference.getId())
                .groupId(conference.getStudyGroup().getId())
                .title(conference.getTitle())
                .imageUrl(conference.getImage().getImageUrl())
                .build();
    }
}
