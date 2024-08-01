package com.nomz.doctorstudy.studygroup.repository;

import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudyGroupRepository extends JpaRepository<StudyGroup, Long> {
    @Query("SELECT sg FROM StudyGroup sg LEFT JOIN FETCH sg.studyGroupTags st LEFT JOIN FETCH st.tag WHERE sg.id = :groupId")
    Optional<StudyGroup> findByIdWithTags(@Param("groupId") Long groupId);

    // 그룹장으로서 담당하고 있는 스터디 그룹을 찾는 메서드
    List<StudyGroup> findByCaptain(Member captain);
}
