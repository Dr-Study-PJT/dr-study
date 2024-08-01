package com.nomz.doctorstudy.conference.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class ConferenceMemberId implements Serializable {
    private Long conferenceId;
    private Long memberId;
}