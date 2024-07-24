package com.nomz.doctorstudy.conference.service;

import com.nomz.doctorstudy.conference.Conference;
import com.nomz.doctorstudy.conference.request.CreateConferenceRequest;
import com.nomz.doctorstudy.conference.request.GetConferenceListRequest;

import java.util.List;

public interface ConferenceService {
    Long createConference(CreateConferenceRequest request);

    Conference getConference(Long conferenceId);

    List<Conference> getConferenceList(GetConferenceListRequest command);

    void startConference(Long conferenceId);

    void finishConference(Long conferenceId);
}
