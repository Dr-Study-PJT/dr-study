package com.nomz.doctorstudy.conference.room;

import com.nomz.doctorstudy.conference.room.signal.Signal;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class SignalTransmitter {
    private final SimpMessagingTemplate template;

    public void transmitSignal(Long roomId, Signal signal) {
        String destination = String.format("/topic/signal/%s/%d", signal.getSignalType().getToken(), roomId);
        log.debug("Transmitted signal:{} to room:{}, destination:{}", signal.getClass().getSimpleName(), roomId, destination);
        template.convertAndSend(destination, signal);
    }
}
