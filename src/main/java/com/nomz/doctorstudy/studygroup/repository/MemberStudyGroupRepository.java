package com.nomz.doctorstudy.studygroup.repository;

import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroup;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupId;
import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberStudyGroupRepository extends JpaRepository<MemberStudyGroup, MemberStudyGroupId> {
    List<MemberStudyGroup> findByMemberStudyGroupIdStudyGroupIdAndIsLeavedFalse(Long studyGroupId);
    List<MemberStudyGroup> findByMemberId(Long memberId);
    Integer countByStudyGroupAndIsLeavedFalse(StudyGroup studyGroup);
    boolean existsByMemberStudyGroupIdMemberIdAndMemberStudyGroupIdStudyGroupIdAndIsLeavedFalse(Long memberId, Long studyGroupId);

}
