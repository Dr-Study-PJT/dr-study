package com.nomz.doctorstudy.studygroup.entity;

import com.nomz.doctorstudy.member.Member;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@Entity
@Table(name = "member_study_group_apply")
public class MemberStudyGroupApply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="member_id", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "study_group_id", nullable = false)
    private StudyGroup studyGroup;

    @Column(name = "status", nullable = false)
    private String status; // e.g., "PENDING", "APPROVED", "REJECTED"

    @Column(name = "created_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column(name = "message", length = 256)
    private String message;

}
