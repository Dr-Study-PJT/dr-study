package com.nomz.doctorstudy.notification;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;

import java.util.List;
import java.util.Map;

@Slf4j
public class CustomChannelInterceptor implements ChannelInterceptor {

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);

        if (accessor != null) {
            StompCommand command = accessor.getCommand();
            log.debug("StompCommand={}", command);

            if (StompCommand.CONNECT.equals(command)) {
                // CONNECT 명령 처리
                MessageHeaders headers = message.getHeaders();
                log.debug("MessageHeaders={}", headers);

                Map<String, List<String>> nativeHeaders = (Map<String, List<String>>) headers.get("nativeHeaders");

                if (nativeHeaders != null) {
                    String memberId = nativeHeaders.get("memberId") != null ? nativeHeaders.get("memberId").get(0) : null;

                    log.debug("New web socket connection from memberId: {}", memberId);
                }
            }
            if (StompCommand.DISCONNECT.equals(command)) {
                // DISCONNECT 명령 처리
                String sessionId = accessor.getSessionId();
                log.debug("Disconnected web socket session id: {}", sessionId);

                // 추가적인 연결 해제 로직 구현
            }
        }

        return message;
    }
}
