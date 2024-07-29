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
    @JoinColumn(name = "member_id")
    private Member member;

    //TODO: 길이 확인
    @Column(length = 5000)
    private String prePrompt;

    //TODO: 길이 확인
    @Column(length = 5000)
    private String script;

    @Column
    private LocalDateTime createdAt;

    @Column(length = 128)
    private String description;

    @Column
    private String gptApiKey;
}
