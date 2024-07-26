package com.nomz.doctorstudy.studygroup.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
public class MemberStudyGroupId implements Serializable {
    private Long memberId;
    private Long studyGroupId;

    // Default constructor, equals, and hashCode
}
