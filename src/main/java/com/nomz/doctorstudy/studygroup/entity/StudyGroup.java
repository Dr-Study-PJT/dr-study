package com.nomz.doctorstudy.studygroup.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
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

    //@Column(nullable = false)
    //private Member captainId;

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
    private int memberCount;

    private int memberCapacity;

    @OneToMany(mappedBy = "studyGroup", cascade = CascadeType.ALL)
    private List<StudyGroupTag> studyGroupTags;


}

