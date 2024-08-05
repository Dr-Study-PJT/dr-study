package com.nomz.doctorstudy.article.repository;

import com.nomz.doctorstudy.article.entity.ArticleTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleTagRepository extends JpaRepository<ArticleTag, Long> {
}
