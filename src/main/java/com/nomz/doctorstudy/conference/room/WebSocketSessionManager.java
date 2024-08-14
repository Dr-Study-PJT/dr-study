package com.nomz.doctorstudy.conference.room;

import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Consumer;

@Slf4j
@Component
public class WebSocketSessionManager {
    private final Map<String, WebSocketSessionData> sessionRoomMap = new ConcurrentHashMap<>();

    @Setter
    private Consumer<WebSocketSessionData> connectCallback;
    @Setter
    private Consumer<WebSocketSessionData> disconnectCallback;

    public void addSession(String session, WebSocketSessionData webSocketSessionData) {
        log.debug("Added WebSocketSession sessionId={}, roomId={}, memberId={}", session, webSocketSessionData.getRoomId(), webSocketSessionData.getMemberId());

        sessionRoomMap.put(session, webSocketSessionData);

        connectCallback.accept(webSocketSessionData);
    }

    public void removeSession(String session) {
        WebSocketSessionData webSocketSessionData = sessionRoomMap.get(session);
        if (webSocketSessionData == null) {
            log.warn("Tried to remove session from sessionRoomMap but couldn't session");
            return;
        }
        log.debug("Removed WebSocketSession sessionId={}, roomId={}, memberId={}", session, webSocketSessionData.getRoomId(), webSocketSessionData.getMemberId());

        sessionRoomMap.remove(session);

        disconnectCallback.accept(webSocketSessionData);
    }
}
