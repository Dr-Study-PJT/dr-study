package com.nomz.doctorstudy.moderator.entity;

import com.nomz.doctorstudy.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Processor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = true)
    private Member creator;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    //TODO: 길이 확인
    @Column(length = 5000, nullable = false)
    private String prePrompt;

    //TODO: 길이 확인
    @Column(length = 5000, nullable = false)
    private String script;

    @Column(length = 128, nullable = false)
    private String description;
}
