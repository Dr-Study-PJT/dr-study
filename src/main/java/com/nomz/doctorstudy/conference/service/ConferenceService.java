package com.nomz.doctorstudy.conference.service;

import com.nomz.doctorstudy.conference.request.CreateConferenceRequest;
import com.nomz.doctorstudy.conference.request.GetConferenceListRequest;
import com.nomz.doctorstudy.conference.request.InviteMemberConferenceRequest;
import com.nomz.doctorstudy.conference.request.JoinConferenceRequest;
import com.nomz.doctorstudy.conference.response.*;
import com.nomz.doctorstudy.member.entity.Member;

import java.util.List;

public interface ConferenceService {
    CreateConferenceResponse createConference(Member requester, CreateConferenceRequest request);

    GetConferenceResponse getConference(Long conferenceId);

    List<GetConferenceListResponse> getConferenceList(GetConferenceListRequest request);

    void startConference(Long conferenceId);

    void finishConference(Long conferenceId);

    JoinConferenceResponse joinConference(Member requester, Long conferenceId, JoinConferenceRequest request);

    InviteMemberConferenceResponse inviteMemberConference(Member member, Long conferenceId, InviteMemberConferenceRequest request);
}
