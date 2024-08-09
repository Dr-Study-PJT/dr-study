package com.nomz.doctorstudy.statistic.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberStatisticDTO {
    // 총 컨퍼런스 참여 시간
    private Integer totalConferenceTime;
    // 총 컨퍼런스 참여 횟수
    private Integer totalConferenceJoinCount;
    // 누적 컨퍼런스 참여 횟수 내림차순으로 스터디그룹 top3 뽑기
    private List<TopStudyGroupInfo> top3StudyGroups;
    // 누적 스터디그룹 가입 횟수 (모든 스터디그룹)
    private Integer totalGroupJoinCount;
    // 멤버 관심사: 현재 가입된 스터디 그룹 태그 모두 가져와서 내림차순
    private Map<String, Long> totalGroupTags;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TopStudyGroupInfo {
        private Long studyGroupId;
        private String studyGroupName;
        private Integer joinCount; // 해당 스터디 그룹에 가입한 횟수
    }

}
