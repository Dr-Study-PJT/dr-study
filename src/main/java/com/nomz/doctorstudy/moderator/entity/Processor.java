package com.nomz.doctorstudy.moderator.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

// TODO: prePrompt와 script의 최대 길이는 10,000이 적당한가?

@Entity
@Getter
public class Processor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 10000)
    private String prePrompt;

    @Column(length = 10000)
    private String script;

    @Column
    private LocalDateTime createdAt;

    @Column(length = 128)
    private String description;

    @Column
    private String gptApiKey;
}
