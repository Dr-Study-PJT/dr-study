//package com.nomz.doctorstudy.article.service;
//
//import com.nomz.doctorstudy.article.entity.Article;
//import com.nomz.doctorstudy.article.entity.Comment;
//import com.nomz.doctorstudy.article.exception.ArticleErrorCode;
//import com.nomz.doctorstudy.article.repository.ArticleRepository;
//import com.nomz.doctorstudy.article.repository.CommentReposirory;
//import com.nomz.doctorstudy.article.request.CommentRequest;
//import com.nomz.doctorstudy.article.request.CreateArticleRequest;
//import com.nomz.doctorstudy.article.request.UpdateArticleRequest;
//import com.nomz.doctorstudy.common.exception.BusinessException;
//import com.nomz.doctorstudy.member.entity.Member;
//import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
//import com.nomz.doctorstudy.studygroup.exception.StudyGroupErrorCode;
//import com.nomz.doctorstudy.studygroup.repository.StudyGroupRepository;
//import lombok.RequiredArgsConstructor;
//import org.aspectj.lang.annotation.Aspect;
//import org.aspectj.lang.annotation.Before;
//import org.springframework.stereotype.Component;
//
//@Aspect
//@Component
//@RequiredArgsConstructor
//public class ArticleCheckAspect {
//
//    private final ArticleRepository articleRepository;
//    private final StudyGroupRepository studyGroupRepository;
//    private final CommentReposirory commentRepository;
//
//    @Before("execution(* com.nomz.doctorstudy.article.service.ArticleService.createArticle(..)) && args(groupId, request, requester)")
//    public void checkStudyGroupBeforeCreateArticle(Long groupId) {
//        StudyGroup studyGroup = studyGroupRepository.findById(groupId)
//                .orElseThrow(() -> new BusinessException(StudyGroupErrorCode.STUDYGROUP_NOT_FOUND_ERROR));
//
//        if (studyGroup.getIsDeleted()) {
//            throw new BusinessException(StudyGroupErrorCode.STUDYGROUP_NOT_FOUND_ERROR);
//        }
//    }
//
//    @Before("execution(* com.nomz.doctorstudy.article.service.ArticleService.updateArticle(..)) && args(articleId, request, requester)")
//    public void checkArticleBeforeUpdate(Long articleId) {
//        Article article = articleRepository.findById(articleId)
//                .orElseThrow(() -> new BusinessException(ArticleErrorCode.ARTICLE_NOT_FOUND_ERROR));
//
//        if (article.getIsDeleted()) {
//            throw new BusinessException(ArticleErrorCode.ARTICLE_NOT_FOUND_ERROR);
//        }
//    }
//
//    @Before("execution(* com.nomz.doctorstudy.article.service.ArticleService.deleteArticle(..)) && args(articleId, requester)")
//    public void checkArticleBeforeDelete(Long articleId) {
//        Article article = articleRepository.findById(articleId)
//                .orElseThrow(() -> new BusinessException(ArticleErrorCode.ARTICLE_NOT_FOUND_ERROR));
//
//        if (article.getIsDeleted()) {
//            throw new BusinessException(ArticleErrorCode.ARTICLE_NOT_FOUND_ERROR);
//        }
//    }
//
//    @Before("execution(* com.nomz.doctorstudy.article.service.ArticleService.createComment(..)) && args(articleId, request, requester)")
//    public void checkArticleBeforeCreateComment(Long articleId) {
//        Article article = articleRepository.findById(articleId)
//                .orElseThrow(() -> new BusinessException(ArticleErrorCode.ARTICLE_NOT_FOUND_ERROR));
//
//        if (article.getIsDeleted()) {
//            throw new BusinessException(ArticleErrorCode.ARTICLE_NOT_FOUND_ERROR);
//        }
//    }
//
//    @Before("execution(* com.nomz.doctorstudy.article.service.ArticleService.updateComment(..)) && args(commentId, request, requester)")
//    public void checkCommentBeforeUpdate(Long commentId) {
//        Comment comment = commentRepository.findById(commentId)
//                .orElseThrow(() -> new BusinessException(ArticleErrorCode.COMMENT_NOT_FOUND_ERROR));
//
//        if (comment.getIsDeleted()) {
//            throw new BusinessException(ArticleErrorCode.COMMENT_NOT_FOUND_ERROR);
//        }
//    }
//
//    @Before("execution(* com.nomz.doctorstudy.article.service.ArticleService.deleteComment(..)) && args(commentId, requester)")
//    public void checkCommentBeforeDelete(Long commentId) {
//        Comment comment = commentRepository.findById(commentId)
//                .orElseThrow(() -> new BusinessException(ArticleErrorCode.COMMENT_NOT_FOUND_ERROR));
//
//        if (comment.getIsDeleted()) {
//            throw new BusinessException(ArticleErrorCode.COMMENT_NOT_FOUND_ERROR);
//        }
//    }
//
////    @Before("execution(* com.nomz.doctorstudy.article.service.ArticleService.createArticle(..)) && args(groupId, .., ..)")
////    public void checkStudyGroupDeleted(Long groupId){
////        StudyGroup studyGroup = studyGroupRepository.findById(groupId)
////                .orElseThrow(() -> new BusinessException(StudyGroupErrorCode.STUDYGROUP_NOT_FOUND_ERROR));
////
////        if(studyGroup.getIsDeleted()){
////            throw new BusinessException(StudyGroupErrorCode.STUDYGROUP_NOT_FOUND_ERROR);
////        }
////    }
////
////    @Before("execution(* com.nomz.doctorstudy.article.service..*(..)) && args(articleId,..)")
////    public void checkArticleDeleted(Long articleId){
////        Article article = articleRepository.findById(articleId)
////                .orElseThrow(() -> new BusinessException(ArticleErrorCode.ARTICLE_NOT_FOUND_ERROR));
////
////        if(article.getIsDeleted()){
////            throw new BusinessException(ArticleErrorCode.ARTICLE_NOT_FOUND_ERROR);
////        }
////    }
////
////    @Before("execution(* com.nomz.doctorstudy.article.service..*(..)) && args(commentId,..)")
////    public void checkCommentDeleted(Long commentId){
////        Comment comment = commentRepository.findById(commentId)
////                .orElseThrow(() -> new BusinessException(ArticleErrorCode.COMMENT_NOT_FOUND_ERROR));
////
////        if(comment.getIsDeleted()){
////            throw new BusinessException(ArticleErrorCode.COMMENT_NOT_FOUND_ERROR);
////        }
//    }
//
////}
