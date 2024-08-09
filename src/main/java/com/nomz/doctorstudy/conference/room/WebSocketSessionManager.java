package com.nomz.doctorstudy.conference.room;

import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Consumer;

@Component
public class WebSocketSessionManager {
    private final Map<String, WebSocketSessionData> sessionRoomMap = new ConcurrentHashMap<>();

    @Setter
    private Consumer<WebSocketSessionData> disconnectCallback;

    public void addSession(String session, WebSocketSessionData webSocketSessionData) {
        sessionRoomMap.put(session, webSocketSessionData);
    }

    public void removeSession(String session) {
        WebSocketSessionData webSocketSessionData = sessionRoomMap.get(session);

        disconnectCallback.accept(webSocketSessionData);
        sessionRoomMap.remove(session);

    }
}
