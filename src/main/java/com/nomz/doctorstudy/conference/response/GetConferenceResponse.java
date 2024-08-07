package com.nomz.doctorstudy.conference.response;

import com.nomz.doctorstudy.conference.entity.Conference;
import com.nomz.doctorstudy.conference.entity.ConferenceMember;
import com.nomz.doctorstudy.member.response.MemberInfo;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder(access = AccessLevel.PRIVATE)
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

    @Schema(description = "컨퍼런스 개최 시각", example = "2024-08-01T22:20:42.483173")
    private final LocalDateTime openTime;

    @Schema(description = "컨퍼런스 폐회 시각", example = "2024-08-02T22:41:32.483173")
    private final LocalDateTime closeTime;

    @Schema(description = "컨퍼런스 진행 시작 시각", example = "2024-08-01T22:30:42.483173")
    private final LocalDateTime startTime;

    @Schema(description = "컨퍼런스 진행 종료 시각", example = "2024-08-02T22:20:42.483173")
    private final LocalDateTime finishTime;

    @Schema(description = "컨퍼런스 이미지 URL", example = "[image URL]")
    private final String imageUrl;

    @Schema(description = "참여자 목록", example = "")
    private final List<MemberInfo> participants;

    public static GetConferenceResponse of(Conference conference) {
        return builder()
                .id(conference.getId())
                .hostId(conference.getHost().getId())
                .studyGroupId(conference.getStudyGroup().getId())
                .title(conference.getTitle())
                .subject(conference.getSubject())
                .memberCapacity(conference.getMemberCapacity())
                .openTime(conference.getOpenTime())
                .closeTime(conference.getCloseTime())
                .startTime(conference.getStartTime())
                .finishTime(conference.getFinishTime())
                .imageUrl(conference.getImage().getImageUrl())
                .participants(conference.getParticipants().stream().
                        map(ConferenceMember::getMember).
                        map(com.nomz.doctorstudy.member.response.MemberInfo::of).toList())
                .build();
    }
}
