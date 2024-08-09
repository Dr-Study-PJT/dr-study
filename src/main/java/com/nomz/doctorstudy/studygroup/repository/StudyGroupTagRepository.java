package com.nomz.doctorstudy.studygroup.repository;

import com.nomz.doctorstudy.studygroup.entity.StudyGroupTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StudyGroupTagRepository extends JpaRepository<StudyGroupTag, Long> {
    List<StudyGroupTag> findByStudyGroupIdIn(List<Long> studyGroupIds);

    @Query("SELECT st.tag.name, COUNT(st.tag.id) FROM StudyGroupTag st " +
            "WHERE st.studyGroup.id IN :studyGroupIds " +
            "GROUP BY st.tag.name " +
            "ORDER BY COUNT(st.tag.id) DESC")
    List<Object[]> findTagFrequencyByStudyGroupIds(@Param("studyGroupIds") List<Long> studyGroupIds);
}
