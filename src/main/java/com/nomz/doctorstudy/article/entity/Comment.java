package com.nomz.doctorstudy.article.entity;
import com.nomz.doctorstudy.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
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
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @Column(name="is_deleted")
    private Boolean isDeleted;

    @Column(name="deleted_at")
    private LocalDateTime deletedAt;

}
