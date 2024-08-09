package com.nomz.doctorstudy.conference.room;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Map;
import java.util.Set;

@Slf4j
@Component
public class WebSocketEventListener {

    //@EventListener
    public void handleWebSocketConnectionListener(SessionConnectedEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        headerAccessor.getMessageHeaders().forEach((s, o) -> log.debug("s={}, o={}", s, o));

        String sessionId = headerAccessor.getSessionId();
        String memberId = headerAccessor.getFirstNativeHeader("abc");
        log.debug("[WebSocket Connect Event] sessionId={}, memberId={}", sessionId, memberId);
    }

    //@EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();
        log.debug("[WebSocket Disconnect Event] sessionId={}", sessionId);
    }
}
