package com.nomz.doctorstudy.studygroup.repository;

import com.nomz.doctorstudy.studygroup.ApplicationStatus;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupApply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberStudyGroupApplyRepository extends JpaRepository<MemberStudyGroupApply, Long> {
    Optional<MemberStudyGroupApply> findByMemberIdAndStudyGroupId(Long memberId, Long studyGroupId);
    List<MemberStudyGroupApply> findByStudyGroupIdInAndApplicationStatus(List<Long> studyGroupIds, ApplicationStatus applicationStatus);

}
