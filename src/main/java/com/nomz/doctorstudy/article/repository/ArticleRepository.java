package com.nomz.doctorstudy.article.repository;

import com.nomz.doctorstudy.article.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    Optional<Article> findByIdAndIsDeletedFalse(Long ArticleId);
    Page<Article> findByStudyGroupId(Long groupId, Pageable pageable);
}
