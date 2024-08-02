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
public class Avatar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = true)
    private Member creator;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false, length = 32)
    private String voiceType;

    @Column(nullable = false, length = 32)
    private String characterType;

    @Column(nullable = false, length = 32)
    private String modelType;
}
