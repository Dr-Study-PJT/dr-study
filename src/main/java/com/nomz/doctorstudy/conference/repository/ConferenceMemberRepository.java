package com.nomz.doctorstudy.conference.repository;

import com.nomz.doctorstudy.conference.entity.ConferenceMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConferenceMemberRepository extends JpaRepository<ConferenceMember, ConferenceMember.ConferenceMemberId> {
    List<ConferenceMember> findByConferenceId(Long conferenceId);
}
