package com.nomz.doctorstudy.studygroup;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class StudyGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 32)
    private String name;

    @Column(nullable = false)
    private Long imageId;

    @Column(nullable = false)
    private Long captainId;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private boolean isDeleted;

    @Column(nullable = false, length = 256)
    private String description;

    @Column(nullable = false, length = 64)
    private String goal;

    private LocalDateTime dueDate;

    @Column(nullable = false)
    private int memberCount;

    private int memberCapacity;

    // Getters and Setters
}

