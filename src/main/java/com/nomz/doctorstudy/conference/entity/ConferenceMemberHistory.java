package com.nomz.doctorstudy.conference.entity;

import com.nomz.doctorstudy.conference.ConferenceEvent;
import com.nomz.doctorstudy.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Entity
@Builder(access = AccessLevel.PRIVATE)
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class ConferenceMemberHistory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "conference_id")
    private Conference conference;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column
    @Enumerated(EnumType.STRING)
    private ConferenceEvent event;

    @Column
    private LocalDateTime createdAt;

    public static ConferenceMemberHistory of(Conference conference, Member member, ConferenceEvent event) {
        return ConferenceMemberHistory.builder()
                .conference(conference)
                .member(member)
                .event(event)
                .createdAt(LocalDateTime.now())
                .build();
    }
}