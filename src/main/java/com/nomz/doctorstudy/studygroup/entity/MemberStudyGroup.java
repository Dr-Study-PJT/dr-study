package com.nomz.doctorstudy.studygroup.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@IdClass(MemberStudyGroupId.class)
@Getter
@Setter
public class MemberStudyGroup {
    @Id
    private Long memberId;

    @Id
    private Long studyGroupId;

    @Column(nullable = false, length = 32)
    private String role;

    @Column(nullable = false)
    private LocalDateTime joinDate;

    @Column(nullable = false)
    private boolean isLeaved;

    private LocalDateTime leavedDate;

    // Getters and Setters
}
