package com.nomz.doctorstudy.article.repository;

import com.nomz.doctorstudy.article.entity.Article;
import com.nomz.doctorstudy.article.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentReposirory extends JpaRepository<Comment, Long> {
    Optional<Comment> findByIdAndIsDeletedFalse(Long commentId);
}
