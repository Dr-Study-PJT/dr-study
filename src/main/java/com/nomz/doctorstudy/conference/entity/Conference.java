package com.nomz.doctorstudy.conference.entity;

import com.nomz.doctorstudy.image.entity.Image;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.moderator.entity.Moderator;
import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Builder
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Conference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "moderator_id")
    private Moderator moderator;

    @ManyToOne
    @JoinColumn(name = "host_id", nullable = false)
    private Member host;

    @ManyToOne
    @JoinColumn(name = "study_group_id", nullable = false)
    private StudyGroup studyGroup;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String subject;

    @Column
    private String aiReview;

    @Column(nullable = false)
    private Integer memberCapacity;

    @ManyToOne
    @JoinColumn(name = "image_id")
    private Image image;

    @Column
    private LocalDateTime startTime;

    @Column
    private LocalDateTime finishTime;

    @OneToMany(mappedBy = "conference")
    private List<ConferenceMember> participants;

    @OneToMany(mappedBy = "conference")
    private List<ConferenceMemberInvite> invitees;

    public void updateStartTime(LocalDateTime localDateTime) {
        this.startTime = localDateTime;
    }

    public void updateFinishTime(LocalDateTime localDateTime) {
        this.finishTime = localDateTime;
    }

    public void updateModerator(Moderator moderator) {
        this.moderator = moderator;
    }
}