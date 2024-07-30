package com.nomz.doctorstudy.ai;

import com.nomz.doctorstudy.ai.request.AudioRequest;
import org.springframework.web.multipart.MultipartFile;

public interface AiService {
    public void processAudioData(AudioRequest audioData, MultipartFile file);
}
