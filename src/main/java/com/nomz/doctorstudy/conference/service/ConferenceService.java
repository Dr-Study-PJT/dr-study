package com.nomz.doctorstudy.conference.service;

import com.nomz.doctorstudy.conference.entity.Conference;
import com.nomz.doctorstudy.conference.request.*;
import com.nomz.doctorstudy.member.entity.Member;

import java.util.List;

public interface ConferenceService {
    Long createConference(Member requester, CreateConferenceRequest request);

    Conference getConference(Long conferenceId);

    List<Conference> getConferenceList(GetConferenceListRequest request);

    List<Member> getConferenceParticipantList(Long conferenceId);

    void openConference(Long conferenceId, OpenConferenceRequest request);

    void startConference(Long conferenceId);

    void finishConference(Long conferenceId);

    void closeConference(Long conferenceId);

    List<String> joinConference(Member requester, Long conferenceId, JoinConferenceRequest request);

    void quitConference(Member requester, Long conferenceId);

    void inviteMemberConference(Member requester, Long conferenceId, InviteMemberConferenceRequest request);

    List<Member> getConferenceInvitees(Long conferenceId);
}
