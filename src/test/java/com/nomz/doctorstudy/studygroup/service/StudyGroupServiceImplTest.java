package com.nomz.doctorstudy.studygroup.service;

import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import com.nomz.doctorstudy.studygroup.request.CreateStudyGroupRequest;
import com.nomz.doctorstudy.studygroup.request.GetStudyGroupListRequest;
import jakarta.transaction.Transactional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

@SpringBootTest
class StudyGroupServiceImplTest {
    @Autowired
    StudyGroupService studyGroupService;

    @Test
    @DisplayName("그룹 태그로 검색")
    @Transactional
    void searchGroupByTag() {
        // given
        studyGroupService.createStudyGroup(new CreateStudyGroupRequest(
                "나의 그룹1",
                1L,
                "나의 그룹1입니다.",
                LocalDateTime.now(),
                10,
                List.of("토익", "정처기")
        ));
        studyGroupService.createStudyGroup(new CreateStudyGroupRequest(
                "나의 그룹2",
                2L,
                "나의 그룹2입니다.",
                LocalDateTime.now(),
                11,
                List.of("토익")
        ));

        // when
        List<StudyGroup> searchResult = studyGroupService.getStudyGroupList(GetStudyGroupListRequest.builder()
                .tagName("정처기")
                .build()
        );

        // then
        Assertions.assertThat(searchResult.size()).isEqualTo(1);
    }
    
    /*
        신청 테스트
        given
        1. 멤버 만들기
        2. 스터디그룹 만들기

        when
        3. 가입 신청 호출하기

        then
        4. 신청 조회하기 했을 때 조회 되는지 확인
     */
}

