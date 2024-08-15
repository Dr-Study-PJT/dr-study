package com.nomz.doctorstudy.statistic.service;

import com.nomz.doctorstudy.conference.entity.ConferenceMemberHistory;
import com.nomz.doctorstudy.conference.repository.ConferenceMemberHistoryRepository;
import com.nomz.doctorstudy.member.repository.MemberRepository;
import com.nomz.doctorstudy.statistic.dto.MemberStatisticDTO;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroup;
import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import com.nomz.doctorstudy.studygroup.repository.MemberStudyGroupRepository;
import com.nomz.doctorstudy.studygroup.repository.StudyGroupRepository;
import com.nomz.doctorstudy.studygroup.repository.StudyGroupTagRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class StatisticServiceImpl implements  StatisticService{
    private final ConferenceMemberHistoryRepository conferenceMemberHistoryRepository;
    private final MemberRepository memberRepository;
    private final MemberStudyGroupRepository memberStudyGroupRepository;
    private final StudyGroupTagRepository studyGroupTagRepository;
    private final StudyGroupRepository studyGroupRepository;

    @Override
    @Transactional
    public MemberStatisticDTO getMemberStatistic(Long userId) {
        List<ConferenceMemberHistory> conferenceMemberHistories = conferenceMemberHistoryRepository.findByMemberId(userId);
        List<MemberStudyGroup> memberStudyGroups = memberStudyGroupRepository.findByMemberId(userId);

        // 총 컨퍼런스 참여 시간과 횟수 계산
        AtomicInteger totalConferenceJoinCount = new AtomicInteger();
        int totalConferenceTime = conferenceMemberHistories.stream()
                .mapToInt(cm -> {
                    // 컨퍼런스 시간 차이를 계산
                    if (cm.getConference().getStartTime() != null && cm.getConference().getFinishTime() != null) {
                        Duration duration = Duration.between(cm.getConference().getStartTime(), cm.getConference().getFinishTime());
                        totalConferenceJoinCount.addAndGet(1);
                        return (int) duration.toMinutes();
                    }
                    return 0;
                })
                .sum(); // 모든 시간 차이를 합산

        // 스터디 그룹별 가입 횟수 계산
        Map<Long, Integer> studyGroupJoinCounts = memberStudyGroups.stream()
                .collect(Collectors.groupingBy(msg -> msg.getStudyGroup().getId(), Collectors.summingInt(msg -> 1)));

        List<MemberStatisticDTO.TopStudyGroupInfo> top3StudyGroups = studyGroupJoinCounts.entrySet().stream()
                .sorted((e1, e2) -> e2.getValue().compareTo(e1.getValue())) // 내림차순 정렬
                .limit(3)
                .map(e -> {
                    Long studyGroupId = e.getKey();
                    String studyGroupName = studyGroupRepository.findById(studyGroupId)
                            .map(StudyGroup::getName)
                            .orElse("Unknown"); // 이름을 찾지 못하면 기본값
                    return new MemberStatisticDTO.TopStudyGroupInfo(studyGroupId, studyGroupName, e.getValue());
                })
                .collect(Collectors.toList());

        // 스터디 그룹 태그 가져오기
        // 1. 멤버가 속한 스터디 그룹들의 ID 가져오기
        List<Long> studyGroupIds = memberStudyGroupRepository.findByMemberId(userId).stream()
                .map(msg -> msg.getStudyGroup().getId())
                .collect(Collectors.toList());

        // 2. 스터디 그룹 ID들에 속한 태그들의 빈도수 가져오기
        List<Object[]> tagFrequencyData = studyGroupTagRepository.findTagFrequencyByStudyGroupIds(studyGroupIds);

        // 3. 태그 ID와 빈도수 데이터를 Map으로 변환하여 반환
        Map<String, Long> studyGroupTags =   tagFrequencyData.stream()
                .collect(Collectors.toMap(
                        data -> (String) data[0], // Tag ID 또는 Name
                        data -> (Long) data[1]    // Frequency Count
                ));

        // 총 스터디 그룹 가입 횟수
        int totalGroupJoinCount = memberStudyGroups.size();

        // DTO를 조합하여 반환
        return MemberStatisticDTO.builder()
                .totalConferenceTime(totalConferenceTime)
                .totalConferenceJoinCount(totalConferenceJoinCount.get())
                .top3StudyGroups(top3StudyGroups)
                .totalGroupJoinCount(totalGroupJoinCount)
                .totalGroupTags(studyGroupTags)
                .build();

    }
}
