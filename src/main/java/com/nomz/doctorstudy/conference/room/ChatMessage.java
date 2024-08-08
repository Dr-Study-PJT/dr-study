package com.nomz.doctorstudy.conference.room;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class ChatMessage {
    private Long id;
    private String message;
    private String nickname;
    private String imageUrl;
    private LocalDateTime time;
}
