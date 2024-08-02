package com.nomz.doctorstudy.conference.service;

import com.nomz.doctorstudy.conference.entity.Conference;
import com.nomz.doctorstudy.conference.request.CreateConferenceRequest;
import com.nomz.doctorstudy.conference.request.GetConferenceListRequest;
import com.nomz.doctorstudy.conference.request.InviteMemberConferenceRequest;
import com.nomz.doctorstudy.conference.request.JoinConferenceRequest;
import com.nomz.doctorstudy.member.entity.Member;

import java.util.List;

public interface ConferenceService {
    Long createConference(/*Member requester, */CreateConferenceRequest request);

    Conference getConference(Long conferenceId);

    List<Conference> getConferenceList(GetConferenceListRequest request);

    List<Member> getConferenceParticipantList(Long conferenceId);

    void openConference(Long conferenceId);

    void startConference(Long conferenceId);

    void finishConference(Long conferenceId);

    List<String> joinConference(/*Member requester, */Long conferenceId, JoinConferenceRequest request);

    void inviteMemberConference(Member requester, Long conferenceId, InviteMemberConferenceRequest request);
}
