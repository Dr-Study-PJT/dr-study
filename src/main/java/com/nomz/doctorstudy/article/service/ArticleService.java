package com.nomz.doctorstudy.article.service;

import com.nomz.doctorstudy.article.entity.Article;
import com.nomz.doctorstudy.article.entity.Comment;
import com.nomz.doctorstudy.article.request.CreateArticleRequest;
import com.nomz.doctorstudy.article.request.CommentRequest;
import com.nomz.doctorstudy.article.request.UpdateArticleRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;


public interface ArticleService {
    Article createArticle(CreateArticleRequest request, Authentication authentication);
    Article updateArticle(Long articleId, UpdateArticleRequest request, Authentication authentication);
    //Article getArticle(Long articleId, Authentication authentication);
    Article getArticle(Long articleId);
    Article deleteArticle(Long articleId, Authentication authentication);
    Page<Article> getArticleList(Long groupId, Pageable pageable);
    Comment createComment(Long articleId, CommentRequest request, Authentication authentication);
    Comment updateComment(Long commentId, CommentRequest request, Authentication authentication);
    Comment deleteComment(Long commentId, Authentication authentication);
}
