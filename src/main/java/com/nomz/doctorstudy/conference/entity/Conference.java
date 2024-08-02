package com.nomz.doctorstudy.conference.entity;

import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.moderator.entity.Moderator;
import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Conference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "moderator_id", nullable = true)
    private Moderator moderator;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = true)
    private Member host;

    @ManyToOne
    @JoinColumn(name = "study_group_id", nullable = true)
    private StudyGroup studyGroup;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String subject;

    @Column
    private String aiReview;

    @Column(nullable = false)
    private Integer memberCapacity;

    @Column
    private Long imageId;

    @Column
    private LocalDateTime startTime;

    @Column
    private LocalDateTime finishTime;

}