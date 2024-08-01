package com.nomz.doctorstudy.article.service;

import com.nomz.doctorstudy.article.entity.Article;
import com.nomz.doctorstudy.article.repository.ArticleRepository;
import com.nomz.doctorstudy.article.request.CreateArticleRequest;
import com.nomz.doctorstudy.common.auth.MemberDetails;
import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.exception.auth.AuthErrorCode;
import com.nomz.doctorstudy.member.exception.auth.AuthException;
import com.nomz.doctorstudy.member.service.MemberService;
import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import com.nomz.doctorstudy.studygroup.exception.StudyGroupErrorCode;
import com.nomz.doctorstudy.studygroup.repository.StudyGroupRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService{
    private final MemberService memberService;
    private final ArticleRepository articleRepository;
    private final StudyGroupRepository studyGroupRepository;
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
        return article;
    }
}
