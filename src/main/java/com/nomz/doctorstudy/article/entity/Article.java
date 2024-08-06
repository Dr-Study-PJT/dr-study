package com.nomz.doctorstudy.article.entity;

import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="article")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="title", nullable = false)
    private String title;

    @Column(name="content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column(name="createdAt", nullable = false, columnDefinition = "datetime default now()")
    private LocalDateTime createdAt;

    @Column(name="deletedAt", columnDefinition = "datetime default now()")
    private LocalDateTime deletedAt;

    @Column(name="is_deleted", nullable = false, columnDefinition = "tinyint default 0")
    private Boolean isDeleted;

    @Column(name = "view_count", nullable = false)
    private Long viewCount;

    @ManyToOne
    @JoinColumn(name="member_id", nullable = false)
    private Member writer;

    @ManyToOne
    @JoinColumn(name = "study_group_id", nullable = false)
    private StudyGroup studyGroup;

    @OneToMany(mappedBy = "article")
    private List<Comment> comments;

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ArticleTag> articleTags;
}
