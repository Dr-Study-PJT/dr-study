package com.nomz.doctorstudy.blockinterpreter.blockexecutors.command;

import com.nomz.doctorstudy.api.ExternalApiCallService;
import com.nomz.doctorstudy.api.VoiceType;
import com.nomz.doctorstudy.blockinterpreter.BlockErrorCode;
import com.nomz.doctorstudy.blockinterpreter.BlockException;
import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockVariable;
import com.nomz.doctorstudy.common.audio.AudioUtils;
import com.nomz.doctorstudy.conference.room.signal.AvatarSpeakSignal;
import com.nomz.doctorstudy.conference.room.SignalTransmitter;
import com.nomz.doctorstudy.conference.room.signal.GptSummarySignal;
import com.nomz.doctorstudy.conference.room.signal.MuteSignal;
import com.nomz.doctorstudy.conference.room.signal.UnmuteSignal;
import com.nomz.doctorstudy.image.service.S3Service;
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
    private final S3Service s3Service;

    @Value("${audio-utils.upper-path}")
    private String audioUpperPath;
    private static final String AUDIO_FILE_NAME = "avatar_audio_";
    private static final String AUDIO_EXT = ".mp3";

    public LetAvatarSpeakBlockExecutor(ThreadProcessContext threadProcessContext, SignalTransmitter signalTransMitter, ExternalApiCallService externalApiCallService, S3Service s3Service) {
        super(void.class, List.of(String.class));
        this.threadProcessContext = threadProcessContext;
        this.signalTransMitter = signalTransMitter;
        this.externalApiCallService = externalApiCallService;
        this.s3Service = s3Service;
    }

    @Override
    protected Object executeAction(List<Object> args) {
        String speechContent = (String) args.get(0);

        log.debug("let avatar speak: {}", speechContent);

        byte[] speechAudio = externalApiCallService.tts(speechContent, VoiceType.MEN_LOW);

        long processId = threadProcessContext.getProcessId();

        String audioPath = audioUpperPath + AUDIO_FILE_NAME + processId + AUDIO_EXT;
        AudioUtils.saveFile(speechAudio, audioPath);
        File file = new File(audioPath);

        int audioDurationMills = AudioUtils.getAudioLength(file.getAbsolutePath());
        log.debug("tts audio duration={}", audioDurationMills);

        log.debug("thread:{} started to sleep", processId);
        try {
            Thread.sleep(audioDurationMills);
        } catch (InterruptedException e) {
            throw new BlockException(BlockErrorCode.PROCESS_INTERRUPTED, e);
        }
        log.debug("thread:{} is being awaken", processId);

        Object numOfParticipantObj = threadProcessContext.getVariable(BlockVariable.NUM_OF_PARTICIPANT.getToken());
        if (numOfParticipantObj == null) return null;

        int numOfParticipant = (int) numOfParticipantObj;
        for (int i=1; i<=numOfParticipant; i++) {
            signalTransMitter.transmitSignal(processId, new MuteSignal((long) i));
        }

        signalTransMitter.transmitSignal(processId, new AvatarSpeakSignal(audioDurationMills));

        for (int i=1; i<=numOfParticipant; i++) {
            signalTransMitter.transmitSignal(processId, new UnmuteSignal((long) i));
        }

        String summary = externalApiCallService.gpt("다음 문장을 맘껏 요약해서 말해봐 => " + speechContent);
        log.debug("summary text={}", summary);
        signalTransMitter.transmitSignal(processId, new GptSummarySignal(summary));

        return null;
    }

    @Override
    public Object executeGetProgramme(List<Object> args) {
        threadProcessContext.addProgrammeInfo("AI 말하기");

        return null;
    }
}
