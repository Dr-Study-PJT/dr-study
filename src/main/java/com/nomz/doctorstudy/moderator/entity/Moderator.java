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
public class Moderator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "processor_id", nullable = false)
    private Processor processor;

    @ManyToOne
    @JoinColumn(name = "avatar_id", nullable = false)
    private Avatar avatar;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = true)
    private Member creator;

    @Column
    private String name;

    @Column
    private LocalDateTime createdAt;

}
