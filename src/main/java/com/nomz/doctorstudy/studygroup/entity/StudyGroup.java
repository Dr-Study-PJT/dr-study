package com.nomz.doctorstudy.studygroup.entity;

import com.nomz.doctorstudy.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudyGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 32)
    private String name;

    @Column(nullable = false)
    private Long imageId;

    @ManyToOne
    @JoinColumn(name= "captain", nullable = false)
    private Member captain;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private Boolean isDeleted;

    @Column(nullable = false, length = 256)
    private String description;

    @Column(length = 64)
    private String goal;

    private LocalDateTime dueDate;

    @Column(nullable = false)
    private Integer memberCount;

    private Integer memberCapacity;

    @OneToMany(mappedBy = "studyGroup", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<StudyGroupTag> studyGroupTags;
}

