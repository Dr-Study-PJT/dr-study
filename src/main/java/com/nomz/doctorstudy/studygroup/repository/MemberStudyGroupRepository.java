package com.nomz.doctorstudy.studygroup.repository;

import com.nomz.doctorstudy.studygroup.MemberStudyGroup;
import com.nomz.doctorstudy.studygroup.MemberStudyGroupId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberStudyGroupRepository extends JpaRepository<MemberStudyGroup, MemberStudyGroupId> {
}
