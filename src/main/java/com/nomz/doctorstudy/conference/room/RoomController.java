package com.nomz.doctorstudy.conference.room;

import com.nomz.doctorstudy.common.audio.AudioUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;

@Slf4j
@RestController
@RequiredArgsConstructor
public class RoomController {
    private final SignalSender signalSender;

    @MessageMapping("/chat/{conferenceId}")
    @SendTo("/topic/chat/{conferenceId}")
    public ChatMessage message(@DestinationVariable("conferenceId") Long conferenceId, ChatMessage chatMessage) {
        log.debug("sender:{} sent chat message:{} from conference:{}", chatMessage.getSenderId(), chatMessage, conferenceId);
        return chatMessage;
    }

    @MessageMapping("/signal/{conferenceId}")
    public void message(@DestinationVariable("conferenceId") Long conferenceId, Signal signal) {
        log.debug("sender:{} sent signal message:{} from conference:{}", signal.getSenderId(), signal, conferenceId);

        if (signal.getSignal().equals("audio")) {
            String rawAudioStr = signal.getRawAudio();
            log.debug("rawAudioStr={}", rawAudioStr.substring(0, rawAudioStr.indexOf("//")));
            AudioUtils.playAudioFromByteArr(Base64.getDecoder().decode(rawAudioStr));
        }
    }

    @PostMapping("/signal-send/{conferenceId}")
    public ResponseEntity<?> sendSignalMessage(
            @PathVariable("conferenceId") Long conferenceId,
            @RequestBody Signal signal)
    {
        log.debug("trying to send SignalMessage:{} to conference:{}", signal, conferenceId);
        signalSender.sendSignal(conferenceId, signal);
        return ResponseEntity.ok(signal);
    }
}
