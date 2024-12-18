package com.nomz.doctorstudy.conference.room;

import com.nomz.doctorstudy.api.ExternalApiCallService;
import com.nomz.doctorstudy.blockinterpreter.*;
import com.nomz.doctorstudy.common.audio.AudioUtils;
import com.nomz.doctorstudy.conference.room.signal.*;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@Tag(name = "Room API", description = "Room 제어 API 입니다.")
public class SignalController {
    private final SignalTransmitter signalTransMitter;
    private final BlockInterpreter blockInterpreter;
    private final ExternalApiCallService externalApiCallService;
    private final ProcessManager processManager;

    @Value("${audio-utils.upper-path}")
    private String audioUpperPath;
    private static final String AUDIO_FILE_NAME = "participant_audio_";
    private static final String AUDIO_EXT = ".webm";

    @MessageMapping("/chat/{conferenceId}")
    @SendTo("/topic/chat/{conferenceId}")
    public ChatMessage handleChatMessage(@DestinationVariable("conferenceId") Long conferenceId, ChatMessage chatMessage) {
        log.debug("[Conference{} Chat] {}: {}", conferenceId, chatMessage.getNickname(), chatMessage);
        return chatMessage;
    }

    @MessageMapping("/signal/{conferenceId}/participant-audio")
    public void handleParticipantAudioTextSignal(@DestinationVariable("conferenceId") Long conferenceId, ParticipantAudioSignal signal) {
        log.debug("signal: {} from conference: {}", signal, conferenceId);

        byte[] rawAudioData = Base64.getDecoder().decode(signal.getRawAudio());

        String audioPath = audioUpperPath + AUDIO_FILE_NAME + conferenceId + AUDIO_EXT;
        AudioUtils.saveFile(rawAudioData, audioPath);

        String transcript = externalApiCallService.stt(rawAudioData);

        ProcessContext processContext = processManager.getProcessContext(conferenceId);
        processContext.addTranscript(signal.getId(), transcript);

        ProcessLockManager.awaken(conferenceId);
    }

    @MessageMapping("/signal/{conferenceId}/participant-audio-text")
    public void handleParticipantAudioTextSignal(@DestinationVariable("conferenceId") Long conferenceId, ParticipantAudioTextSignal signal) {
        log.debug("signal: {} from conference: {}", signal, conferenceId);

        String transcript = signal.getText();

        ProcessContext processContext = processManager.getProcessContext(conferenceId);
        processContext.addTranscript(signal.getId(), transcript);

        ProcessLockManager.awaken(conferenceId);
    }

    @MessageMapping("/signal/{conferenceId}/heartbeat")
    public void handleHeartBeatSignal(@DestinationVariable("conferenceId") Long conferenceId, HeartBeatSignal signal) {
        log.debug("[member:{}] send heartbeat signal from conference: {}", signal.getId(), conferenceId);
    }

    //
    //
    //

    @PostMapping("/v1/conferences/{conferenceId}/send-mute-signal")
    public ResponseEntity<?> sendMuteSignal(
            @PathVariable("conferenceId") Long conferenceId,
            @RequestBody MuteSignal muteSignal
    ) {
        log.debug("trying to send SignalMessage:{} to conference:{}", muteSignal, conferenceId);
        signalTransMitter.transmitSignal(conferenceId, muteSignal);
        return ResponseEntity.ok(muteSignal);
    }

    @PostMapping("/v1/conferences/{conferenceId}/send-unmute-signal")
    public ResponseEntity<?> sendUnmuteSignal(
            @PathVariable("conferenceId") Long conferenceId,
            @RequestBody UnmuteSignal unmuteSignal
    ) {
        log.debug("trying to send Unmute to conference:{}", conferenceId);
        signalTransMitter.transmitSignal(conferenceId, unmuteSignal);
        return ResponseEntity.ok(unmuteSignal);
    }

    @PostMapping("/v1/conferences/{conferenceId}/send-avatar-speak-signal")
    public ResponseEntity<?> sendAvatarSpeakSignal(
            @PathVariable("conferenceId") Long conferenceId,
            @RequestBody AvatarSpeakSignal avatarSpeakSignal
            ) {
        log.debug("trying to send Avatar Speak to conference:{}", conferenceId);
        signalTransMitter.transmitSignal(conferenceId, avatarSpeakSignal);
        return ResponseEntity.ok(avatarSpeakSignal);
    }

    @PostMapping("/v1/conferences/{conferenceId}/run-block-script")
    public ResponseEntity<?> runBlockScript(
            @PathVariable("conferenceId") Long conferenceId,
            @RequestBody String script
    ) {
        blockInterpreter.init(conferenceId, script, Map.of(), ConferenceContext.builder().build());
        blockInterpreter.interpret(conferenceId);

        return ResponseEntity.ok("OK\n" + script);
    }

    @PostMapping("/v1/conferences/{conferenceId}/send-heartstop-signal")
    public ResponseEntity<?> sendHeartstopSignal(
            @PathVariable("conferenceId") Long conferenceId,
            @RequestBody HeartStopSignal heartStopSignal
    ) {
        log.debug("trying to send Heartstop to conference:{}", conferenceId);
        signalTransMitter.transmitSignal(conferenceId, heartStopSignal);

        return ResponseEntity.ok("OK");
    }
}
