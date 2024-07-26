package com.nomz.doctorstudy.blockprocessor;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TranscriptionManager {
    private final Map<Long, List<String>> transcriptionHistoryMap;

    public TranscriptionManager() {
        transcriptionHistoryMap = new HashMap<>();
    }

    public void init(Long conferenceId) {
        transcriptionHistoryMap.put(conferenceId, new ArrayList<>());
    }

    public void addRecentTranscription(Long conferenceId, String transcription) {
        transcriptionHistoryMap.get(conferenceId).add(transcription);
    }

    public String getRecentTranscription(Long conferenceId, int n) {
        List<String> transcriptions = transcriptionHistoryMap.get(conferenceId);
        return transcriptions.get(transcriptions.size() - n);
    }

    public void clear(Long conferenceId){
        transcriptionHistoryMap.remove(conferenceId);
    }
}
