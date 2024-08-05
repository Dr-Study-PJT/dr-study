package com.nomz.doctorstudy.article.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="content", nullable = false, length = 1024)
    private String content;

    @Column(name="created_at", nullable=false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @Column(name="is_deleted", nullable = false)
    private Boolean isDeleted;

    @Column(name="Field")
    private String field;
}
