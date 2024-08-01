package com.nomz.doctorstudy.conference.entity;

import com.nomz.doctorstudy.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConferenceMember {
    @EmbeddedId
    private ConferenceMemberId id;

    @MapsId("conferenceId")
    @ManyToOne
    @JoinColumn(name = "conference_id")
    private Conference conference;

    @MapsId("memberId")
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}