package com.nomz.doctorstudy.article.service;

import com.nomz.doctorstudy.article.entity.Article;
import com.nomz.doctorstudy.article.entity.ArticleTag;
import com.nomz.doctorstudy.article.exception.ArticleErrorCode;
import com.nomz.doctorstudy.article.repository.ArticleRepository;
import com.nomz.doctorstudy.article.repository.ArticleTagRepository;
import com.nomz.doctorstudy.article.request.CreateArticleRequest;
import com.nomz.doctorstudy.article.request.UpdateArticleRequest;
import com.nomz.doctorstudy.common.auth.MemberDetails;
import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.exception.auth.AuthErrorCode;
import com.nomz.doctorstudy.member.exception.auth.AuthException;
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
import org.springframework.security.core.Authentication;
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
    @Override
    public Article createArticle(CreateArticleRequest request, Authentication authentication) {
        // JWT 토큰에서 사용자 가져오기
        // --------------------------------------------------------------------------
        if(authentication == null){
            throw new AuthException(AuthErrorCode.AUTH_NOT_VALID_ACCESS_TOKEN);
        }
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        String email = memberDetails.getUsername();
        Member member = memberService.getUserByEmail(email);
        // --------------------------------------------------------------------------
        StudyGroup studyGroup = studyGroupRepository.findById(request.getStudyGroupId())
                .orElseThrow(() -> new BusinessException(StudyGroupErrorCode.STUDYGROUP_NOT_FOUND_ERROR));


        Article article = Article.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .createdAt(LocalDateTime.now())
                .isDeleted(Boolean.FALSE)
                .viewCount(0L)
                .writer(member)
                .studyGroup(studyGroup)
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
    public Article updateArticle(Long articleId, UpdateArticleRequest request, Authentication authentication) {
        // JWT 토큰에서 사용자 가져오기
        // --------------------------------------------------------------------------
        if(authentication == null){
            throw new AuthException(AuthErrorCode.AUTH_NOT_VALID_ACCESS_TOKEN);
        }
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        String email = memberDetails.getUsername();
        // --------------------------------------------------------------------------
        Article article = articleRepository.findByIdAndIsDeletedFalse(articleId)
                .orElseThrow(() -> new BusinessException(ArticleErrorCode.ARTICLE_NOT_FOUND_ERROR));

        if(!article.getWriter().getEmail().equals(email)){
            throw new BusinessException(ArticleErrorCode.ARTICLE_NOT_AUTHORIZED);
        }

        article.setTitle(request.getTitle());
        article.setContent(request.getContent());

        return articleRepository.save(article);
    }

    @Override
    public Article getArticle(Long articleId, Authentication authentication) {
        // JWT 토큰에서 사용자 가져오기
        // --------------------------------------------------------------------------
        if(authentication == null){
            throw new AuthException(AuthErrorCode.AUTH_NOT_VALID_ACCESS_TOKEN);
        }
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        String email = memberDetails.getUsername();
        Member member = memberService.getUserByEmail(email);
        // --------------------------------------------------------------------------
        Article article = articleRepository.findByIdAndIsDeletedFalse(articleId)
                .orElseThrow(() -> new BusinessException(ArticleErrorCode.ARTICLE_NOT_FOUND_ERROR));

        return article;

    }

    @Override
    public Article getArticleNoAuth(Long articleId) {
        Article article = articleRepository.findByIdAndIsDeletedFalse(articleId)
                .orElseThrow(() -> new BusinessException(ArticleErrorCode.ARTICLE_NOT_FOUND_ERROR));

        return article;
    }

    @Override
    public Article deleteArticle(Long articleId, Authentication authentication) {
        // JWT 토큰에서 사용자 가져오기
        // --------------------------------------------------------------------------
        if(authentication == null){
            throw new AuthException(AuthErrorCode.AUTH_NOT_VALID_ACCESS_TOKEN);
        }
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        String email = memberDetails.getUsername();
        Member member = memberService.getUserByEmail(email);
        // --------------------------------------------------------------------------
        Article article = articleRepository.findByIdAndIsDeletedFalse(articleId)
                .orElseThrow(() -> new BusinessException(ArticleErrorCode.ARTICLE_NOT_FOUND_ERROR));
        if(!Objects.equals(article.getWriter().getId(), member.getId())){
            throw new BusinessException(ArticleErrorCode.ARTICLE_NOT_AUTHORIZED);
        }

        article.setIsDeleted(Boolean.TRUE);
        article.setDeletedAt(LocalDateTime.now());
        return articleRepository.save(article);
    }

    @Override
    public Page<Article> getArticleList(Long groupId, Pageable pageable) {
        return articleRepository.findByStudyGroupId(groupId, pageable);
    }
}
