package com.nomz.doctorstudy.conference.service;

import com.nomz.doctorstudy.conference.Conference;
import com.nomz.doctorstudy.conference.request.CreateConferenceRequest;
import com.nomz.doctorstudy.conference.dto.GetConferenceListRequest;

import java.util.List;

public interface ConferenceService {
    Conference createConference(CreateConferenceRequest request);

    Conference getConference(Long conferenceId);

    List<Conference> getConferenceList(GetConferenceListRequest command);
}
