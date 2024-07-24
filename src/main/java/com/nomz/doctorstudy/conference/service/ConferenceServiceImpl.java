package com.nomz.doctorstudy.conference.service;

import com.nomz.doctorstudy.blockprocessor.BlockProcessService;
import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.conference.Conference;
import com.nomz.doctorstudy.conference.ConferenceErrorCode;
import com.nomz.doctorstudy.conference.dto.ConferenceSearchFilter;
import com.nomz.doctorstudy.conference.repository.ConferenceQueryRepository;
import com.nomz.doctorstudy.conference.repository.ConferenceRepository;
import com.nomz.doctorstudy.conference.request.CreateConferenceRequest;
import com.nomz.doctorstudy.conference.request.GetConferenceListRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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
    private final BlockProcessService blockProcessService;

    @Override
    public Long createConference(CreateConferenceRequest request) {
        Conference conference = Conference.builder()
                .title(request.getTitle())
                .memberCapacity(request.getMemberCapacity())
                .build();
        conferenceRepository.save(conference);
        log.info("[new conference] id={}, title={}", conference.getId(), conference.getTitle());
        return conference.getId();
    }

    @Override
    @Transactional
    public Conference getConference(Long conferenceId) {
        return conferenceRepository.findById(conferenceId)
                .orElseThrow(() -> new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_FOUND_ERROR));
    }

    @Override
    public List<Conference> getConferenceList(GetConferenceListRequest command) {
        return conferenceQueryRepository.getConferenceList(
                ConferenceSearchFilter.builder()
                        .title(command.getTitle())
                        .memberCapacity(command.getMemberCapacity())
                        .build()
        );
    }

    @Override
    public void startConference(Long conferenceId) {
        // 리포지토리에서 스크립트 불러오기
        String script = "asdf";
        Map<String, Object> varMap = new HashMap<>();
        blockProcessService.startBlockProcessor(conferenceId, script, varMap);
    }

    @Override
    public void finishConference(Long conferenceId) {

    }
}
