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
public class ConferenceMember {
    @EmbeddedId
    private ConferenceMemberId id;

    @ManyToOne
    @MapsId("conferenceId")
    @JoinColumn(name = "confernce_id")
    private Conference conference;

    @ManyToOne
    @MapsId("memberId")
    @JoinColumn(name = "member_id")
    private Member member;

    @Embeddable
    @EqualsAndHashCode
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ConferenceMemberId implements Serializable {
        private Long conferenceId;
        private Long memberId;
    }
}
