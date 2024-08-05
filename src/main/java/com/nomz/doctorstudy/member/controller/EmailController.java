package com.nomz.doctorstudy.member.controller;


import com.nomz.doctorstudy.common.dto.SuccessResponse;
import com.nomz.doctorstudy.common.redis.RedisUtil;
import com.nomz.doctorstudy.member.request.EmailSendRequest;
import com.nomz.doctorstudy.member.request.ResetPasswordRequest;
import com.nomz.doctorstudy.member.request.VerifyEmailNumberRequest;
import com.nomz.doctorstudy.member.service.EmailService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@RequestMapping("/v1/email")
@Slf4j
@RequiredArgsConstructor
@Tag(name = "Email API", description = "Email API 입니다.")
public class EmailController {
    private final EmailService emailService;

    //회원가입할때 인증번호 보내기
    @PostMapping("/email-code")
    public ResponseEntity<?> sendSignupEmail(@RequestBody EmailSendRequest emailSendRequest){
        emailService.sendSignupEmail(emailSendRequest.getEmail());

        //인증번호 redis에 유효기간 두고 저장
        //일단은 5분으로 설정해둠
//        redisUtil.setValueWithTTL(emailSendRequest.getEmail() + "email", asdf, Duration.ofMillis(1000 * 60 * 5L));

//        return ResponseEntity.status(200).body("인증번호 전송 = " + asdf);
        return ResponseEntity.ok(
                new SuccessResponse<>("인증번호가 전송되었습니다.", null)
        );
    }

    //회원가입할때 보냈던 인증번호 체크
    @GetMapping("/email-code")
    public ResponseEntity<?> verifyAuthNumber(@RequestBody VerifyEmailNumberRequest verifyEmailNumberRequest){
        //레디스에서 꺼낸 값이랑 보낸 인증번호랑 같은지 체크

        return ResponseEntity.ok(
                new SuccessResponse<>("인증번호가 일치합니다.", null)
        );
    }


    //비밀번호 찾기 할때 인증번호 보내기
    @PostMapping("/find-password")
    public ResponseEntity<?> sendResetPasswordEmail(@RequestBody EmailSendRequest emailSendRequest){
        emailService.sendFindPasswordEmail(emailSendRequest.getEmail());

//        redisUtil.setValueWithTTL(uuid, emailSendRequest.getEmail(), Duration.ofMillis(1000 * 60 * 60 * 24));

//        return ResponseEntity.status(200).body("비밀번호 리셋 링크 전송");
        return ResponseEntity.ok(
                new SuccessResponse<>("비밀번호 변경 링크 전송", null)
        );
    }


    @PatchMapping("/reset-password")
    public ResponseEntity<?> resetPasswordEmail(@RequestParam(name = "token") String token, @RequestBody ResetPasswordRequest resetPasswordRequest){
        log.info("token = {}", token);
        log.info("email = {}",resetPasswordRequest.getEmail());

        emailService.resetPasswordEmail(token, resetPasswordRequest);

        return ResponseEntity.ok(
                new SuccessResponse<>("비밀번호 변경 성공", null)
        );
    }


}
