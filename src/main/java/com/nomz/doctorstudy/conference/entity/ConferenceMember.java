package com.nomz.doctorstudy.conference.entity;

import com.nomz.doctorstudy.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@Builder(access = AccessLevel.PRIVATE)
@EqualsAndHashCode
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

    private void updateConference(Conference conference) {
        this.conference = conference;
        conference.getParticipants().add(this);
    }

    private void updateMember(Member member) {
        this.member = member;
    }

    public static ConferenceMember of(Conference conference, Member member) {
        ConferenceMember conferenceMember = ConferenceMember.builder()
                .id(new ConferenceMemberId(conference.getId(), member.getId()))
                .conference(conference)
                .member(member)
                .build();

        conferenceMember.updateConference(conference);
        conferenceMember.updateMember(member);

        return conferenceMember;

    }
}