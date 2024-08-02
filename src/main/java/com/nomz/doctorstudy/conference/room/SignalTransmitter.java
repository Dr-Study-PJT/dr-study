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

    public void transmitSignal(Long conferenceId, Signal signal) {
        String destination = String.format("/topic/signal/%s/%d", signal.getSignalType().getToken(), conferenceId);
        log.debug("\ntransmitted signal:{} to conference:{}, destination:{}", signal.getClass().getName(), conferenceId, destination);
        template.convertAndSend(destination, signal);
    }
}
