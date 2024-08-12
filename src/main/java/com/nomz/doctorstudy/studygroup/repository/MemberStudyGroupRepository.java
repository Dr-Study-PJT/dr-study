package com.nomz.doctorstudy.studygroup.repository;

import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroup;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupId;
import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberStudyGroupRepository extends JpaRepository<MemberStudyGroup, MemberStudyGroupId> {
    List<MemberStudyGroup> findByMemberStudyGroupIdStudyGroupIdAndIsLeavedFalse(Long studyGroupId);
    @Query("SELECT msg FROM MemberStudyGroup msg " +
            "JOIN msg.studyGroup sg " +
            "JOIN msg.member m " +
            "WHERE m.id = :memberId " +
            "AND msg.isLeaved = false " +
            "AND sg.isDeleted = false " +
            "AND m.isLeaved = false")
    List<MemberStudyGroup> findByMemberId(@Param("memberId") Long memberId);
    Integer countByStudyGroupAndIsLeavedFalse(StudyGroup studyGroup);
    boolean existsByMemberStudyGroupIdMemberIdAndMemberStudyGroupIdStudyGroupIdAndIsLeavedFalse(Long memberId, Long studyGroupId);

}
