package com.nomz.doctorstudy.conference.repository;

import com.nomz.doctorstudy.conference.entity.ConferenceMemberInvite;
import com.nomz.doctorstudy.conference.entity.ConferenceMemberInviteId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConferenceMemberInviteRepository extends JpaRepository<ConferenceMemberInvite, ConferenceMemberInviteId> {
    List<ConferenceMemberInvite> findByConferenceId(Long conferenceId);
}
