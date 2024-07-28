package com.nomz.doctorstudy.member.controller;

import com.nomz.doctorstudy.common.auth.MemberDetailService;
import com.nomz.doctorstudy.common.auth.MemberDetails;
import com.nomz.doctorstudy.common.dto.ErrorResponse;
import com.nomz.doctorstudy.common.dto.SuccessResponse;
import com.nomz.doctorstudy.common.jwt.JwtUtil;
import com.nomz.doctorstudy.common.redis.RedisUtil;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.request.*;
import com.nomz.doctorstudy.member.response.MemberLoginPostRes;
import com.nomz.doctorstudy.member.response.PasswordResetUrlResponse;
import com.nomz.doctorstudy.member.service.AuthService;
import com.nomz.doctorstudy.member.service.EmailService;
import com.nomz.doctorstudy.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

/**
 * 인증 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@RestController
@RequestMapping("/v1/auth")
@Slf4j
@RequiredArgsConstructor
public class AuthController {
    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final RedisTemplate<String, String> redisTemplate;
    private final RedisUtil redisUtil;
    private final EmailService emailService;
    private final AuthService authService;


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberLoginPostReq loginInfo, HttpServletResponse response) {

        // 유효한 패스워드가 맞는 경우, 로그인 성공으로 응답.(액세스 토큰을 포함하여 응답값 전달)
        Map<String, String> tokens = authService.login(loginInfo);

        ResponseCookie accessCookie = ResponseCookie.from("access_token", tokens.get("accessToken"))
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(2 * 60 * 60)
                .sameSite("Strict")
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("refresh_token", tokens.get("refreshToken"))
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(2 * 7 * 24 * 60 * 60)
                .sameSite("Strict")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
        response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());


        return ResponseEntity.ok(
                new SuccessResponse<>("로그인 되었습니다.", tokens)
        );
    }

    @GetMapping("/access-token")
    public ResponseEntity<?> getAccessToken(@RequestBody RefreshTokenRequest refreshTokenRequest, HttpServletRequest request, HttpServletResponse response){

        String email = refreshTokenRequest.getEmail();
        String refreshToken = request.getHeader(jwtUtil.HEADER_STRING);

        String accessToken = authService.getAccessToken(email, refreshToken);

        ResponseCookie accessCookie = ResponseCookie.from("access_token", accessToken)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(2 * 60 * 60)
                .sameSite("Strict")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());

        return ResponseEntity.ok(
                new SuccessResponse<>("", accessToken)
        );
    }


    //로그아웃
    @PostMapping("/logout")
    public ResponseEntity<?> logout(Authentication authentication, HttpServletResponse response){
        MemberDetails userDetails = (MemberDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();

        authService.logout(email);

        ResponseCookie accessCookie = ResponseCookie.from("access_token", null)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();

        ResponseCookie refreshCookie = ResponseCookie.from("refresh_token", null)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0)
                .sameSite("Strict")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, accessCookie.toString());
        response.addHeader(HttpHeaders.SET_COOKIE, refreshCookie.toString());

        return ResponseEntity.ok(
                new SuccessResponse<>("로그아웃 되었습니다.", null)
        );
    }







    //회원가입할때 인증번호 보내기
    @PostMapping("/email-code")
    public ResponseEntity<?> sendSignupEmail(@RequestBody EmailSendRequest emailSendRequest){
        //인증번호 redis에 유효기간 두고 저장
        //일단은 5분으로 설정해둠

        emailService.sendSignupEmail(emailSendRequest.getEmail());

        return ResponseEntity.ok(
                new SuccessResponse<>("인증번호가 전송되었습니다.", null)
        );
    }

    //회원가입할때 보냈던 인증번호 체크
    @GetMapping("/email-code")
    public ResponseEntity<?> verifyAuthNumber(@RequestBody VerifyEmailNumberRequest verifyEmailNumberRequest){

        emailService.checkVerifyEmail(verifyEmailNumberRequest);

        return ResponseEntity.ok(
                new SuccessResponse<>("인증번호가 일치합니다", null)
        );
    }


    //비밀번호 찾기 할때 인증번호 보내기
    @PostMapping("/find-password")
    public ResponseEntity<?> sendResetPasswordEmail(@RequestBody EmailSendRequest emailSendRequest){
        emailService.sendFindPasswordEmail(emailSendRequest.getEmail());

        return ResponseEntity.ok(new SuccessResponse<>("비밀번호 변경 링크 전송",  null));
    }



    @PatchMapping("/reset-password")
    public ResponseEntity<?> resetPasswordEmail(@RequestParam(name = "token") String token, @RequestBody ResetPasswordRequest resetPasswordRequest){
        //대충 비밀번호 바꾸는 로직
        emailService.resetPasswordEmail(token, resetPasswordRequest);

        return ResponseEntity.ok(
                new SuccessResponse<>("비밀번호 변경 성공", null)
        );
    }






//	private void setValueWithTTL(String key, String value, Duration ttl) {
//		ValueOperations<String, String> valueOps = redisTemplate.opsForValue();
//		valueOps.set(key, value);
//		redisTemplate.expire(key, ttl);
//	}
}
