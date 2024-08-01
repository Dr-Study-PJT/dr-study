package com.nomz.doctorstudy.conference.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class ConferenceMemberInviteId implements Serializable {
    private Long conferenceId;
    private Long memberId;
}
