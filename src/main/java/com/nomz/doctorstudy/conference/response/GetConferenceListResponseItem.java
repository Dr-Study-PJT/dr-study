package com.nomz.doctorstudy.conference.response;

import com.nomz.doctorstudy.conference.entity.Conference;
import com.nomz.doctorstudy.member.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class GetConferenceListResponseItem {
    @Schema(description = "컨퍼런스 아이디", example = "1")
    private final Long id;

    @Schema(description = "호스트 아이디", example = "1")
    private final Long hostId;

    @Schema(description = "스터디 그룹 아이디", example = "1")
    private final Long studyGroupId;

    @Schema(description = "컨퍼런스 제목", example = "컨퍼런스 제목")
    private final String title;

    @Schema(description = "컨퍼런스 최대 인원수", example = "10")
    private final Integer memberCapacity;


    @Schema(description = "컨퍼런스 시작 시간", example = "2024-08-01T22:20:42.483173")
    private final LocalDateTime startTime;

    @Schema(description = "컨퍼런스 종료 시간", example = "2024-08-04T01:51:32.483173")
    private final LocalDateTime finishTime;

    @Schema(description = "컨퍼런스 이미지 URL", example = "[image URL]")
    private final String imageUrl;

    @Schema(description = "참여자 목록", example = "")
    private final List<MemberInfo> participants;


    @Getter
    @Builder
    public static class MemberInfo {
        @Schema(description = "참여자 아이디", example = "1")
        private final Long id;
        
        @Schema(description = "참여자 이메일", example = "abc@gmail.com")
        private final String email;
        
        @Schema(description = "참여자 닉네임", example = "hamsteak")
        private final String nickname;
        
        @Schema(description = "참여자 이미지 URL", example = "[image URL]")
        private final String imageUrl;

        public static MemberInfo of(Member member, String imageUrl) {
            return builder()
                    .id(member.getId())
                    .email(member.getEmail())
                    .nickname(member.getEmail())
                    .imageUrl(imageUrl)
                    .build();

        }
    }

    public static GetConferenceListResponseItem of(Conference conference, List<MemberInfo> memberInfoList) {
        return builder()
                .id(conference.getId())
                //TODO: .hostId(conference.getHost().getId())
                //TODO: .studyGroupId(conference.getStudyGroup().getId())
                .title(conference.getTitle())
                .memberCapacity(conference.getMemberCapacity())
                .startTime(conference.getStartTime())
                .finishTime(conference.getFinishTime())
                .participants(memberInfoList)
                .build();
    }
}
