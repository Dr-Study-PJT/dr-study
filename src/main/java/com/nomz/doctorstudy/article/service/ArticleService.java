package com.nomz.doctorstudy.article.service;

import com.nomz.doctorstudy.article.entity.Article;
import com.nomz.doctorstudy.article.request.CreateArticleRequest;
import com.nomz.doctorstudy.article.request.UpdateArticleRequest;
import org.springframework.security.core.Authentication;

public interface ArticleService {
    Article createArticle(CreateArticleRequest request, Authentication authentication);
    Article updateArticle(Long articleId, UpdateArticleRequest request, Authentication authentication);
    Article getArticle(Long articleId, Authentication authentication);
    Article getArticleNoAuth(Long articleId);
    Article deleteArticle(Long articleId, Authentication authentication);
}
