package com.nomz.doctorstudy.notification;

import com.nomz.doctorstudy.conference.dto.ConferenceMemberInviteSearchFilter;
import com.nomz.doctorstudy.conference.entity.ConferenceMemberInvite;
import com.nomz.doctorstudy.conference.repository.ConferenceMemberInviteQueryRepository;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupApply;
import com.nomz.doctorstudy.studygroup.repository.StudyGroupMemberApplyQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final StudyGroupMemberApplyQueryRepository studyGroupMemberApplyQueryRepository;
    private final ConferenceMemberInviteQueryRepository conferenceMemberInviteQueryRepository;

    public List<MemberStudyGroupApply> getStudyGroupApplyNotifications(Member requester) {
        return studyGroupMemberApplyQueryRepository.findMemberStudyGroupApplyListByCaptainId(requester.getId());
    }

    public List<ConferenceMemberInvite> getConferenceInviteNotifications(Member requester) {
        return conferenceMemberInviteQueryRepository.getConferenceMemberInviteList(
                ConferenceMemberInviteSearchFilter.builder().
                        inviteeId(requester.getId()).
                        build()
        );
    }
}
