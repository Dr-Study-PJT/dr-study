package com.nomz.doctorstudy.conference.entity;

import com.nomz.doctorstudy.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConferenceMemberInvite {
    @EmbeddedId
    private ConferenceMemberInviteId id;

    @ManyToOne
    @MapsId("conferenceId")
    @JoinColumn(name = "conference_id")
    private Conference conference;

    @ManyToOne
    @MapsId("memberId")
    @JoinColumn(name = "member_id")
    private Member member;
}
