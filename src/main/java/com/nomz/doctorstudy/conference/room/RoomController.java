package com.nomz.doctorstudy.conference.room;

import com.nomz.doctorstudy.blockinterpreter.BlockInterpreter;
import com.nomz.doctorstudy.blockinterpreter.ScriptPreprocessor;
import com.nomz.doctorstudy.common.audio.AudioUtils;
import com.nomz.doctorstudy.conference.room.signal.AvatarSpeakSignal;
import com.nomz.doctorstudy.conference.room.signal.MuteSignal;
import com.nomz.doctorstudy.conference.room.signal.ParticipantAudioSignal;
import com.nomz.doctorstudy.conference.room.signal.UnmuteSignal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
public class RoomController {
    private final SignalTransmitter signalTransMitter;
    private final ScriptPreprocessor scriptPreprocessor;
    private final BlockInterpreter blockInterpreter;

    @MessageMapping("/chat/{conferenceId}")
    @SendTo("/topic/chat/{conferenceId}")
    public ChatMessage handleChatMessage(@DestinationVariable("conferenceId") Long conferenceId, ChatMessage chatMessage) {
        log.debug("sender:{} sent chat message:{} from conference:{}", chatMessage.getId(), chatMessage, conferenceId);
        return chatMessage;
    }

    @MessageMapping("/signal/{conferenceId}/participant-audio")
    public void handleSignal(@DestinationVariable("conferenceId") Long conferenceId, ParticipantAudioSignal signal) {
        log.debug("signal: {} from conference: {}", signal, conferenceId);

        String rawAudio = signal.getRawAudio();
        AudioUtils.playAudioFromByteArr(Base64.getDecoder().decode(rawAudio));
    }

    //

    @PostMapping("/send-mute-signal/{conferenceId}")
    public ResponseEntity<?> sendMuteSignal(
            @PathVariable("conferenceId") Long conferenceId,
            @RequestBody MuteSignal muteSignal
    ) {
        log.debug("trying to send SignalMessage:{} to conference:{}", muteSignal, conferenceId);
        signalTransMitter.transmitSignal(conferenceId, muteSignal);
        return ResponseEntity.ok(muteSignal);
    }

    @PostMapping("/send-unmute-signal/{conferenceId}")
    public ResponseEntity<?> sendUnmuteSignal(
            @PathVariable("conferenceId") Long conferenceId,
            @RequestBody UnmuteSignal unmuteSignal
    ) {
        log.debug("trying to send Unmute to conference:{}", conferenceId);
        signalTransMitter.transmitSignal(conferenceId, unmuteSignal);
        return ResponseEntity.ok(unmuteSignal);
    }

    @PostMapping("/send-avatar-speak-signal/{conferenceId}")
    public ResponseEntity<?> sendAvatarSpeakSignal(
            @PathVariable("conferenceId") Long conferenceId,
            @RequestBody AvatarSpeakSignal avatarSpeakSignal
            ) {
        log.debug("trying to send Avatar Speak to conference:{}", conferenceId);
        signalTransMitter.transmitSignal(conferenceId, avatarSpeakSignal);
        return ResponseEntity.ok(avatarSpeakSignal);
    }

    @PostMapping("/run-block-script")
    public ResponseEntity<?> blockMuteUnmute() {
        String script1 =
                """
                phase(1) {
                    loop(5) {
                        let_avatar_speak('hi');
                        wait(1);
                        let_participant_speak(1, 1);
                        wait(1);
                    }
                }
                """;
        Long id = 1L;
        String preprocessedScript1 = scriptPreprocessor.preprocessScript(script1);
        blockInterpreter.init(id, preprocessedScript1, Map.of());
        blockInterpreter.interpret(id);
        return ResponseEntity.ok("OK");
    }
}
