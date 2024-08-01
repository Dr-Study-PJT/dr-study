package com.nomz.doctorstudy.article.entity;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="content", nullable = false, length = 1024)
    private String content;

    @Column(name="created_at", nullable=false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Article studyGroupArticle;

    @Column(name="is_deleted", nullable = false)
    private Boolean isDeleted;

    @Column(name="Field")
    private String field;
}
