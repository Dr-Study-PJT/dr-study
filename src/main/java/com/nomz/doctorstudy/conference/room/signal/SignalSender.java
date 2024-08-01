package com.nomz.doctorstudy.conference.room.signal;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class SignalSender {
    private final SimpMessagingTemplate template;

    public void sendMuteSignal(Long conferenceId, MuteSignal signal) {
        log.debug("sent mute signal:{} from conference:{}", signal, conferenceId);
        template.convertAndSend("/topic/signal/" + conferenceId + "/mute", signal);
    }

    public void sendUnmuteSignal(Long conferenceId, UnmuteSignal signal) {
        log.debug("sent unmute signal:{} from conference:{}", signal, conferenceId);
        template.convertAndSend("/topic/signal/" + conferenceId + "/unmute", signal);
    }
}
