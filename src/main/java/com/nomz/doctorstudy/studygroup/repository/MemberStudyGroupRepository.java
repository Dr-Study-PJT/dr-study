package com.nomz.doctorstudy.studygroup.repository;

import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroup;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberStudyGroupRepository extends JpaRepository<MemberStudyGroup, MemberStudyGroupId> {
    List<MemberStudyGroup> findByMemberStudyGroupIdStudyGroupIdAndIsLeavedFalse(Long studyGroupId);
    boolean existsByMemberStudyGroupIdMemberIdAndMemberStudyGroupIdStudyGroupIdAndIsLeavedFalse(Long memberId, Long studyGroupId);
}
