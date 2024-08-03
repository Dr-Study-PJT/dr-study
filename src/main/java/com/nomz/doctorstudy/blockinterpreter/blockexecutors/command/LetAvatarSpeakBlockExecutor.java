package com.nomz.doctorstudy.blockinterpreter.blockexecutors.command;

import com.nomz.doctorstudy.api.ExternalApiCallService;
import com.nomz.doctorstudy.blockinterpreter.BlockErrorCode;
import com.nomz.doctorstudy.blockinterpreter.BlockException;
import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import com.nomz.doctorstudy.common.audio.AudioUtils;
import com.nomz.doctorstudy.conference.room.signal.AvatarSpeakSignal;
import com.nomz.doctorstudy.conference.room.SignalTransmitter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.List;

@Slf4j
@Component
public class LetAvatarSpeakBlockExecutor extends BlockExecutor {
    private final ThreadProcessContext threadProcessContext;
    private final SignalTransmitter signalTransMitter;
    private final ExternalApiCallService externalApiCallService;

    @Value("${audio-utils.upper-path}")
    private String audioUpperPath;
    private static final String AUDIO_FILE_NAME = "avatar_audio";
    private static final String AUDIO_EXT = ".wav";

    public LetAvatarSpeakBlockExecutor(ThreadProcessContext threadProcessContext, SignalTransmitter signalTransMitter, ExternalApiCallService externalApiCallService) {
        super(void.class, List.of(String.class));
        this.threadProcessContext = threadProcessContext;
        this.signalTransMitter = signalTransMitter;
        this.externalApiCallService = externalApiCallService;
    }

    @Override
    protected Object executeAction(List<Object> args) {
        String speechContent = (String) args.get(0);

        log.debug("let avatar speak: {}", speechContent);

        byte[] speechAudio = externalApiCallService.tts(speechContent);

        String audioPath = audioUpperPath + AUDIO_FILE_NAME + AUDIO_EXT;
        AudioUtils.saveFile(speechAudio, audioPath);
        File file = new File(audioPath);
        int audioDurationMills = AudioUtils.getAudioLength(file.getAbsolutePath());
        // play for test
        AudioUtils.playAudio(audioPath);
        //

        long processId = threadProcessContext.getProcessId();
        signalTransMitter.transmitSignal(processId, new AvatarSpeakSignal(audioDurationMills));

        try {
            Thread.sleep(audioDurationMills);
        } catch (InterruptedException e) {
            throw new BlockException(BlockErrorCode.PROCESS_INTERRUPTED, e);
        }

        return null;
    }

    @Override
    public Object executeGetProgramme(List<Object> args) {
        threadProcessContext.addProgrammeInfo("AI 말하기");

        return null;
    }
}
