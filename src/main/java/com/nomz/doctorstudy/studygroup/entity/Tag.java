package com.nomz.doctorstudy.studygroup.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 45)
    private String name;

    public Tag(String name) {
        this.name = name;
    }
}
