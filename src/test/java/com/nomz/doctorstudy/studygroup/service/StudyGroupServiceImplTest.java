package com.nomz.doctorstudy.studygroup.service;

import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import com.nomz.doctorstudy.studygroup.entity.Tag;
import com.nomz.doctorstudy.studygroup.request.CreateStudyGroupRequest;
import com.nomz.doctorstudy.studygroup.request.GetStudyGroupListRequest;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class StudyGroupServiceImplTest {
    @Autowired
    StudyGroupService studyGroupService;

    @Test
    @DisplayName("그룹 태그로 검색")
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
}