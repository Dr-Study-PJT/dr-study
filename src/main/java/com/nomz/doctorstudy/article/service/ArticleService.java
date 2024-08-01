package com.nomz.doctorstudy.article.service;

import com.nomz.doctorstudy.article.entity.Article;
import com.nomz.doctorstudy.article.request.CreateArticleRequest;
import org.springframework.security.core.Authentication;

public interface ArticleService {
    Article createArticle(CreateArticleRequest request, Authentication authentication);
}
