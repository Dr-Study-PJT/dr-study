package com.nomz.doctorstudy.conference.service;

import com.nomz.doctorstudy.blockinterpreter.BlockInterpreter;
import com.nomz.doctorstudy.blockinterpreter.ScriptPreprocessor;
import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.conference.Conference;
import com.nomz.doctorstudy.conference.ConferenceErrorCode;
import com.nomz.doctorstudy.conference.dto.ConferenceSearchFilter;
import com.nomz.doctorstudy.conference.repository.ConferenceQueryRepository;
import com.nomz.doctorstudy.conference.repository.ConferenceRepository;
import com.nomz.doctorstudy.conference.request.CreateConferenceRequest;
import com.nomz.doctorstudy.conference.request.GetConferenceListRequest;
import com.nomz.doctorstudy.conference.response.CreateConferenceResponse;
import com.nomz.doctorstudy.conference.response.GetConferenceListResponse;
import com.nomz.doctorstudy.conference.response.GetConferenceResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConferenceServiceImpl implements ConferenceService {
    private final ConferenceRepository conferenceRepository;
    private final ConferenceQueryRepository conferenceQueryRepository;
    private final BlockInterpreter blockInterpreter;
    private final ScriptPreprocessor scriptPreprocessor;

    @Override
    public CreateConferenceResponse createConference(CreateConferenceRequest request) {
        Conference conference = Conference.builder()
                .title(request.getTitle())
                .memberCapacity(request.getMemberCapacity())
                .build();
        conferenceRepository.save(conference);

        log.info("[new conference] id={}, title={}", conference.getId(), conference.getTitle());

        return CreateConferenceResponse.builder()
                .conferenceId(conference.getId())
                .build();
    }

    @Override
    @Transactional
    public GetConferenceResponse getConference(Long conferenceId) {
        Conference conference = conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_FOUND_ERROR));

        return GetConferenceResponse.builder()
                .id(conference.getId())
                .title(conference.getTitle())
                .memberCapacity(conference.getMemberCapacity())
                .build();
    }

    @Override
    public List<GetConferenceListResponse> getConferenceList(GetConferenceListRequest request) {
        List<Conference> conferenceList = conferenceQueryRepository.getConferenceList(
                ConferenceSearchFilter.builder()
                        .title(request.getTitle())
                        .memberCapacity(request.getMemberCapacity())
                        .build()
        );

        return conferenceList.stream()
                .map(GetConferenceListResponse::of)
                .toList();
    }

    @Override
    public void startConference(Long conferenceId) {
        // Todo: 리포지토리에서 스크립트 불러오기
        String script = "asdf";
        Map<String, Object> varMap = new HashMap<>();
        String preprocessedScript = scriptPreprocessor.preprocessScript(script);
        blockInterpreter.init(conferenceId, preprocessedScript, varMap);
    }

    @Override
    public void finishConference(Long conferenceId) {
        blockInterpreter.close(conferenceId);
    }
}
