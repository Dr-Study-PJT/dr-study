package com.nomz.doctorstudy.blockprocessor;

import com.nomz.doctorstudy.blockprocessor.request.AddTranscriptionRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/v1/block-process")
@RequiredArgsConstructor
public class BlockProcessController {
    private final BlockProcessor blockProcessor;

    @PostMapping("/stt")
    public void addTranscription(@RequestBody AddTranscriptionRequest request) {
        Long conferenceId = request.getConferenceId();
        String transcription = request.getTranscription();
        blockProcessor.run(conferenceId);
    }
}
