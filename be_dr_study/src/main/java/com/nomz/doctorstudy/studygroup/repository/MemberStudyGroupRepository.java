package com.nomz.doctorstudy.studygroup.repository;

import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroup;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberStudyGroupRepository extends JpaRepository<MemberStudyGroup, MemberStudyGroupId> {
}
