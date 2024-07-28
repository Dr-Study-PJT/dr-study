package com.nomz.doctorstudy.member.service;

import com.nomz.doctorstudy.common.jwt.JwtUtil;
import com.nomz.doctorstudy.common.redis.RedisUtil;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.exception.auth.AuthErrorCode;
import com.nomz.doctorstudy.member.exception.auth.AuthException;
import com.nomz.doctorstudy.member.request.MemberLoginPostReq;
import com.nomz.doctorstudy.member.response.MemberLoginPostRes;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final MemberService memberService;
    private final JwtUtil jwtUtil;
    private final RedisUtil redisUtil;
    private final RedisTemplate<String, String> redisTemplate;

    @Value("${jwt.refresh-token-expiration}")
    private Integer refreshTokenExpiration;

    public String getAccessToken(String email, String refreshToken){

        if(!jwtUtil.correctRefreshToken(email, refreshToken)){
            throw new AuthException(AuthErrorCode.AUTH_NOT_VALID_REFRESH_TOKEN);
        }

        return jwtUtil.getAccessToken(email);
    }

    @Transactional
    public Map<String, String> login(MemberLoginPostReq memberLoginPostReq){
        String email = memberLoginPostReq.getEmail();
        String password = memberLoginPostReq.getPassword();

        Member member = memberService.getUserByEmail(email);

        if(!passwordEncoder.matches(password, member.getPassword())){
            throw new AuthException(AuthErrorCode.AUTH_FAIL_LOGIN);
        }

        String accessToken = jwtUtil.getAccessToken(email);
        String refreshToken = jwtUtil.getRefreshToken(email);

        redisUtil.setValueWithTTL(email, jwtUtil.TOKEN_PREFIX + refreshToken, Duration.ofMillis(2 * 7 * 24 * 60 * 60 * 1000));

        Map<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", accessToken);
        tokens.put("refreshToken", refreshToken);

        return tokens;
    }

    public void logout(String email){
        redisTemplate.delete(email);
    }

}
