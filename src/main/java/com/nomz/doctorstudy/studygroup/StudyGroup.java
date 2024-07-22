package com.nomz.doctorstudy.studygroup;

import jakarta.persistence.*;
import lombok.*;

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

    // 태그 객체 생성하기
    //private List<String> tags;
    private String tags;

}

