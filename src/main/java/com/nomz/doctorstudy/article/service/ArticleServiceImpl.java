package com.nomz.doctorstudy.article.service;

import com.nomz.doctorstudy.article.entity.Article;
import com.nomz.doctorstudy.article.entity.ArticleTag;
import com.nomz.doctorstudy.article.entity.Comment;
import com.nomz.doctorstudy.article.exception.ArticleErrorCode;
import com.nomz.doctorstudy.article.repository.ArticleRepository;
import com.nomz.doctorstudy.article.repository.ArticleTagRepository;
import com.nomz.doctorstudy.article.repository.CommentReposirory;
import com.nomz.doctorstudy.article.request.CommentRequest;
import com.nomz.doctorstudy.article.request.CreateArticleRequest;
import com.nomz.doctorstudy.article.request.UpdateArticleRequest;
import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.service.MemberService;
import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import com.nomz.doctorstudy.studygroup.exception.StudyGroupErrorCode;
import com.nomz.doctorstudy.studygroup.repository.MemberStudyGroupRepository;
import com.nomz.doctorstudy.studygroup.repository.StudyGroupRepository;
import com.nomz.doctorstudy.tag.Tag;
import com.nomz.doctorstudy.tag.TagRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService{
    private final MemberService memberService;
    private final ArticleRepository articleRepository;
    private final StudyGroupRepository studyGroupRepository;
    private final MemberStudyGroupRepository memberStudyGroupRepository;
    private final TagRepository tagRepository;
    private final ArticleTagRepository articleTagRepository;
    private final CommentReposirory commentReposirory;
    @Override
    public Article createArticle(Long groupId, CreateArticleRequest request, Member requester) {
        StudyGroup studyGroup = studyGroupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessException(StudyGroupErrorCode.STUDYGROUP_NOT_FOUND_ERROR));

        Article article = Article.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .createdAt(LocalDateTime.now())
                .isDeleted(Boolean.FALSE)
                .viewCount(0L)
                .writer(requester)
                .studyGroup(studyGroup)
                .isEdited(Boolean.FALSE)
                .build();

        articleRepository.save(article);

        if(request.getTags() != null && !request.getTags().isEmpty()){
            List<ArticleTag> articleTags = request.getTags().stream()
                    .map(name -> {
                        Tag tag = tagRepository.findByName(name)
                                .orElseGet(() -> tagRepository.save(new Tag(name)));
                        return new ArticleTag(tag, article);
                    }).collect(Collectors.toList());

            articleTagRepository.saveAll(articleTags);
        }
        return article;
    }

    @Transactional
    @Override
    public Article updateArticle(Long articleId, UpdateArticleRequest request, Member requester) {
        Article article = articleRepository.findByIdAndIsDeletedFalse(articleId)
                .orElseThrow(() -> new BusinessException(ArticleErrorCode.ARTICLE_NOT_FOUND_ERROR));

        if(!article.getWriter().getId().equals(requester.getId())){
            throw new BusinessException(ArticleErrorCode.ARTICLE_NOT_AUTHORIZED);
        }

        article.setTitle(request.getTitle());
        article.setContent(request.getContent());
        if(!article.getIsDeleted())
            article.setIsEdited(Boolean.TRUE);

        return articleRepository.save(article);
    }

    @Override
    @Transactional
    public Article getArticle(Long articleId) {
        Article article = articleRepository.findByIdAndIsDeletedFalse(articleId)
                .orElseThrow(() -> new BusinessException(ArticleErrorCode.ARTICLE_NOT_FOUND_ERROR));
        article.setViewCount(article.getViewCount() + 1);
        return article;
    }

    @Override
    @Transactional
    public Article deleteArticle(Long articleId, Member requester) {
        Article article = articleRepository.findByIdAndIsDeletedFalse(articleId)
                .orElseThrow(() -> new BusinessException(ArticleErrorCode.ARTICLE_NOT_FOUND_ERROR));
        if(!Objects.equals(article.getWriter().getId(), requester.getId())){
            throw new BusinessException(ArticleErrorCode.ARTICLE_NOT_AUTHORIZED);
        }

        article.setIsDeleted(Boolean.TRUE);
        article.setDeletedAt(LocalDateTime.now());
        return article;
    }

    @Override
    public Page<Article> getArticleList(Long groupId, Pageable pageable) {
        return articleRepository.findByStudyGroupId(groupId, pageable);
    }

    @Override
    public Comment createComment(Long articleId, CommentRequest request, Member requester) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new BusinessException(ArticleErrorCode.ARTICLE_NOT_FOUND_ERROR));

        Comment comment = Comment.builder()
                .content(request.getContent())
                .createdAt(LocalDateTime.now())
                .member(requester)
                .article(article)
                .isDeleted(Boolean.FALSE)
                .isEdited(Boolean.FALSE)
                .build();

        return commentReposirory.save(comment);
    }

    @Override
    @Transactional
    public Comment updateComment(Long commentId, CommentRequest request, Member requester) {

        Comment comment = commentReposirory.findByIdAndIsDeletedFalse(commentId)
                .orElseThrow(() -> new BusinessException(ArticleErrorCode.ARTICLE_NOT_FOUND_ERROR));

        if(!Objects.equals(requester.getId(), comment.getMember().getId())){
            throw new BusinessException(ArticleErrorCode.COMMENT_NOT_AUTHORIZED);
        }
        comment.setContent(request.getContent());
        if(!comment.getIsEdited())
            comment.setIsEdited(Boolean.TRUE);

        return comment;
    }

    @Override
    @Transactional
    public Comment deleteComment(Long commentId, Member requester) {
        Comment comment = commentReposirory.findById(commentId)
                .orElseThrow(() -> new BusinessException(ArticleErrorCode.COMMENT_NOT_FOUND_ERROR));

        if(!Objects.equals(requester.getId(), comment.getMember().getId())){
            throw new BusinessException(ArticleErrorCode.COMMENT_NOT_AUTHORIZED);
        }
        comment.setIsDeleted(Boolean.TRUE);
        comment.setDeletedAt(LocalDateTime.now());

        return comment;
    }

}
