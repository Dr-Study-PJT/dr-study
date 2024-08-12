package com.nomz.doctorstudy.member;

import com.nomz.doctorstudy.common.auth.MemberDetails;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.exception.auth.AuthErrorCode;
import com.nomz.doctorstudy.member.exception.auth.AuthException;
import com.nomz.doctorstudy.member.exception.member.MemberErrorCode;
import com.nomz.doctorstudy.member.exception.member.MemberException;
import com.nomz.doctorstudy.member.repository.MemberRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.MethodParameter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Slf4j
@Component
@RequiredArgsConstructor
public class LoginMemberArgumentResolver implements HandlerMethodArgumentResolver {
    private final MemberRepository memberRepository;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        boolean hasLoginAnnotation = parameter.hasParameterAnnotation(Login.class);
        boolean hasMemberType = Member.class.isAssignableFrom(parameter.getParameterType());

        return hasLoginAnnotation && hasMemberType;
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        log.debug("Requester Principal={}", principal);
        if (principal instanceof MemberDetails) {
            Member member = ((MemberDetails) principal).getUser();
            log.debug("Found authenticated member={}", member);
            if (member != null) {
                return member;
            }
        }

        if (false) {
            return resolveDevelopToken(webRequest);
        }

        throw new AuthException(AuthErrorCode.UNAUTHORIZED);
    }

    private Member resolveDevelopToken(NativeWebRequest webRequest) {
        //
        // bypass code for test in development environment
        //
        HttpServletRequest request = (HttpServletRequest) webRequest.getNativeRequest();
        log.debug("Controller that requires authentication received request. But request doesn't have token header");
        log.debug("Trying to find bypass header -> '" + LoginToken.DEV_LOGIN_TOKEN + "'");

        String devMemberIdStr = request.getHeader(LoginToken.DEV_LOGIN_TOKEN);
        if (devMemberIdStr == null) {
            log.debug("Failed to authenticate, Request={}", request.getRequestURI());
            throw new AuthException(AuthErrorCode.UNAUTHORIZED);
        }
        Long devMemberId = Long.parseLong(devMemberIdStr);

        log.debug("Acquired memberId={} from '" + LoginToken.DEV_LOGIN_TOKEN + "' header", devMemberId);

        return memberRepository.findById(devMemberId)
                .orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_NOT_FOUND_ERROR));
        //
        //
        //
    }
}
