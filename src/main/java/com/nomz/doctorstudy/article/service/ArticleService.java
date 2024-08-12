package com.nomz.doctorstudy.article.service;

import com.nomz.doctorstudy.article.entity.Article;
import com.nomz.doctorstudy.article.entity.Comment;
import com.nomz.doctorstudy.article.request.CreateArticleRequest;
import com.nomz.doctorstudy.article.request.CommentRequest;
import com.nomz.doctorstudy.article.request.UpdateArticleRequest;
import com.nomz.doctorstudy.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;


public interface ArticleService {
    Article createArticle(Long groupId, CreateArticleRequest request, Member requester);
    Article updateArticle(Long articleId, UpdateArticleRequest request, Member requester);
    Article getArticle(Long articleId);
    Article deleteArticle(Long articleId, Member requester);
    Page<Article> getArticleList(Long groupId, Pageable pageable);
    Comment createComment(Long articleId, CommentRequest request, Member requester);
    Comment updateComment(Long commentId, CommentRequest request, Member requester);
    Comment deleteComment(Long commentId, Member requester);
}
