package com.nomz.doctorstudy.article.repository;

import com.nomz.doctorstudy.article.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArticleRepository extends JpaRepository<Article, Long> {

}
