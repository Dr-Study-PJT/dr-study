package com.nomz.doctorstudy.studygroup.repository;

import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface StudyGroupRepository extends JpaRepository<StudyGroup, Long> {
    @Query("SELECT sg FROM StudyGroup sg LEFT JOIN FETCH sg.studyGroupTags st LEFT JOIN FETCH st.tag WHERE sg.id = :groupId")
    Optional<StudyGroup> findByIdWithTags(@Param("groupId") Long groupId);
}
