package com.nomz.doctorstudy.conference.repository;

import com.nomz.doctorstudy.conference.entity.ConferenceMember;
import com.nomz.doctorstudy.conference.entity.ConferenceMemberId;
import com.nomz.doctorstudy.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConferenceMemberRepository extends JpaRepository<ConferenceMember, ConferenceMemberId> {
    List<ConferenceMember> findByConferenceId(Long conferenceId);
    List<ConferenceMember> findByMemberId(Long memberId);
}
