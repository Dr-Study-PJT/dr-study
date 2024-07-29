package com.nomz.doctorstudy.moderator;

import com.nomz.doctorstudy.member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Avatar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member creator;

    @Column(length = 32)
    private String voiceType;

    @Column(length = 32)
    private String characterType;

    @Column(length = 32)
    private String modelType;
}
