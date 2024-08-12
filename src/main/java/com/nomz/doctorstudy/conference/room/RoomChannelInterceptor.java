package com.nomz.doctorstudy.conference.room;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Slf4j
@Component
@RequiredArgsConstructor
public class RoomChannelInterceptor implements ChannelInterceptor {
    private final WebSocketSessionManager webSocketSessionManager;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (accessor == null) {
            return message;
        }

        String sessionId = accessor.getSessionId();

        StompCommand command = accessor.getCommand();

        if (command == null) {
            return message;
        }

        switch (command) {
            case CONNECT:
                MessageHeaders headers = message.getHeaders();

                Map<String, List<String>> nativeHeaders = (Map<String, List<String>>) headers.get("nativeHeaders");

                if (nativeHeaders == null) {
                    return message;
                }

                String roomId = nativeHeaders.get("roomId") != null ? nativeHeaders.get("roomId").get(0) : null;
                String memberId = nativeHeaders.get("memberId") != null ? nativeHeaders.get("memberId").get(0) : null;

                if (memberId == null || roomId == null) {
                    return message;
                }

                webSocketSessionManager.addSession(sessionId,
                        new WebSocketSessionData(Long.parseLong(roomId), Long.parseLong(memberId))
                );

                log.debug("New WebSocket connection from memberId: {}", memberId);
                break;

            case DISCONNECT:
                webSocketSessionManager.removeSession(sessionId);

                log.debug("Disconnected web socket session id: {}", sessionId);
                break;
        }

        return message;
    }
}
