package com.nomz.doctorstudy.studygroup;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Data
@NoArgsConstructor
public class MemberStudyGroupId implements Serializable {
    private Long memberId;
    private Long studyGroupId;

    // Default constructor, equals, and hashCode
}
