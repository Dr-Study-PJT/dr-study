package com.nomz.doctorstudy.moderator.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class SubCategory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "main_category_id")
    private MainCategory mainCategory;
}
