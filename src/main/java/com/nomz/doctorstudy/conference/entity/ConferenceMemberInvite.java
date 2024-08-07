package com.nomz.doctorstudy.conference.entity;

import com.nomz.doctorstudy.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Getter
@Entity
@Builder(access = AccessLevel.PRIVATE)
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

    @Column
    private LocalDateTime createdAt;

    public void updateConference(Conference conference) {
        this.conference = conference;
        conference.getInvitees().add(this);
    }

    public void updateMember(Member member) {
        this.member = member;
    }

    public static ConferenceMemberInvite of(Conference conference, Member member) {
        ConferenceMemberInvite invite = ConferenceMemberInvite.builder()
                .id(new ConferenceMemberInviteId(conference.getId(), member.getId()))
                .conference(null)
                .member(null)
                .createdAt(LocalDateTime.now())
                .build();
        invite.updateConference(conference);
        invite.updateMember(member);

        return invite;
    }
}
