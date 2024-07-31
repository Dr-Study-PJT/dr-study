package com.nomz.doctorstudy.studygroup.entity;

import com.nomz.doctorstudy.member.entity.Member;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("memberId")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("studyGroupId")
    private StudyGroup studyGroup;

    @Column(nullable = false, length = 32)
    private String role;

    @Column(nullable = false)
    private LocalDateTime joinDate;

    @Column(nullable = false)
    private Boolean isLeaved;

    private LocalDateTime leavedDate;
}
