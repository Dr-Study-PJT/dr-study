package com.nomz.doctorstudy.conference.repository;

import com.nomz.doctorstudy.conference.entity.ConferenceMemberHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConferenceMemberHistoryRepository extends JpaRepository<ConferenceMemberHistory, Long> {
    List<ConferenceMemberHistory> findByConferenceId(Long conferenceId);
    List<ConferenceMemberHistory> findByMemberId(Long memberId);
}
