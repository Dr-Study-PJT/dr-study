package com.nomz.doctorstudy.conference.room;

import com.nomz.doctorstudy.common.audio.AudioUtils;
import com.nomz.doctorstudy.conference.room.signal.MuteSignal;
import com.nomz.doctorstudy.conference.room.signal.ParticipantAudioSignal;
import com.nomz.doctorstudy.conference.room.signal.SignalSender;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;

@Slf4j
@RestController
@RequiredArgsConstructor
public class RoomController {
    private final SignalSender signalSender;

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

    @PostMapping("/send-mute-signal/{conferenceId}")
    public ResponseEntity<?> sendMuteSignal(
            @PathVariable("conferenceId") Long conferenceId,
            @RequestParam Long memberId
    ) {
        MuteSignal muteSignal = new MuteSignal(memberId);
        log.debug("trying to send SignalMessage:{} to conference:{}", muteSignal, conferenceId);
        signalSender.sendSignal(conferenceId, muteSignal);
        return ResponseEntity.ok(muteSignal);
    }
}
