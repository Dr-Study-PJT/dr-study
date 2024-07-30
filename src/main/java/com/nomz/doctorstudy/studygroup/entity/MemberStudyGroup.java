package com.nomz.doctorstudy.studygroup.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberStudyGroup {
    @EmbeddedId
    private MemberStudyGroupId memberStudyGroupId;

    @Column(nullable = false, length = 32)
    private String role;

    @Column(nullable = false)
    private LocalDateTime joinDate;

    @Column(nullable = false)
    private boolean isLeaved;

    private LocalDateTime leavedDate;
}
