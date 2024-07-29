package com.nomz.doctorstudy.conference.service;

import com.nomz.doctorstudy.conference.Conference;
import com.nomz.doctorstudy.conference.request.CreateConferenceRequest;
import com.nomz.doctorstudy.conference.request.GetConferenceListRequest;
import com.nomz.doctorstudy.conference.response.CreateConferenceResponse;
import com.nomz.doctorstudy.conference.response.GetConferenceListResponse;
import com.nomz.doctorstudy.conference.response.GetConferenceResponse;

import java.util.List;

public interface ConferenceService {
    CreateConferenceResponse createConference(CreateConferenceRequest request);

    GetConferenceResponse getConference(Long conferenceId);

    List<GetConferenceListResponse> getConferenceList(GetConferenceListRequest request);

    void startConference(Long conferenceId);

    void finishConference(Long conferenceId);
}
