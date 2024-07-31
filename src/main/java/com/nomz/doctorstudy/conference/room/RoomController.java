package com.nomz.doctorstudy.conference.room;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class RoomController {
    private final SimpMessagingTemplate template;

    @MessageMapping("{conferenceId}")
    public void signal(@DestinationVariable Long conferenceId, RoomSignal signal) {

    }

    public void sendSignalToClient(Long conferenceId, RoomSignal roomSignal) {
        template.convertAndSend("topic/signal" + conferenceId, roomSignal);
    }
}
