package com.nomz.doctorstudy.member.service;

import com.nomz.doctorstudy.common.redis.RedisUtil;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.exception.email.EmailErrorCode;
import com.nomz.doctorstudy.member.exception.email.EmailException;
import com.nomz.doctorstudy.member.exception.member.MemberErrorCode;
import com.nomz.doctorstudy.member.exception.member.MemberException;
import com.nomz.doctorstudy.member.repository.MemberRepository;
import com.nomz.doctorstudy.member.request.ResetPasswordRequest;
import com.nomz.doctorstudy.member.request.VerifyEmailNumberRequest;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.time.Duration;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;
    private final RedisUtil redisUtil;
    private final RedisTemplate<String, String> redisTemplate;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    private String authNumber;
    //추후에 프론트와 협의해서 링크 정하기
    private String resetPwURL = "http://localhost:8080/reset-password?token=";

    @Value("${spring.mail.username}")
    private String setFrom;


    //임의의 6자리 양수를 반환합니다.
    public void makeRandomNumber() {
        Random r = new Random();
        String randomNumber = "";
        for(int i = 0; i < 6; i++) {
            randomNumber += Integer.toString(r.nextInt(10));
        }

        authNumber = randomNumber;
    }

    @Transactional
    public void sendSignupEmail(String toEmail){
        if(memberRepository.findByEmail(toEmail).isPresent()){
            throw new MemberException(MemberErrorCode.MEMBER_EMAIL_EXIST_ERROR);
        }

        makeRandomNumber();
        sendMail(toEmail, "회원 가입 인증 이메일입니다.", "SignupEmailForm", authNumber);
        redisUtil.setValueWithTTL(toEmail + "email", authNumber, Duration.ofMillis(1000 * 60 * 5L));

//        return authNumber;
    }


    public void checkVerifyEmail(VerifyEmailNumberRequest verifyEmailNumberRequest){
        ValueOperations<String, String> vop = redisTemplate.opsForValue();
        String redisVerifyNumber = vop.get(verifyEmailNumberRequest.getEmail() + "email");

        if(redisVerifyNumber == null){
//            return ResponseEntity.status(400).body("인증번호를 다시 요청해주세요");
            throw new EmailException(EmailErrorCode.RETRY_EMAIL_VERIFY_NUMBER_ERROR);

        }

        if(!verifyEmailNumberRequest.getAuthNumber().equals(redisVerifyNumber)){
//            return ResponseEntity.status(400).body("인증번호가 일치하지 않습니다.");
            throw new EmailException(EmailErrorCode.NO_MATCH_VERIFY_NUMBER_ERROR);
        }
    }

    //비밀번호 찾기 인증 이메일
    @Transactional
    public void sendFindPasswordEmail(String toEmail){
        //이메일 있는지 체크
        memberRepository.findByEmail(toEmail).orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_EMAIL_NOT_EXIST_ERROR));

        String uuid = makeUUID();
        sendMail(toEmail, "비밀번호 찾기 인증 이메일입니다.", "FindPasswordEmailForm", resetPwURL + uuid);

        redisUtil.setValueWithTTL(uuid, toEmail, Duration.ofMillis(1000 * 60 * 60 * 24));
//        return uuid;
    }

    //비밀번호 수정 링크 눌렀을때
    @Transactional
    public void resetPasswordEmail(String token, ResetPasswordRequest resetPasswordRequest){

        Member member = memberRepository.findByEmail(resetPasswordRequest.getEmail())
                .orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_EMAIL_NOT_EXIST_ERROR));

        ValueOperations<String, String> vop = redisTemplate.opsForValue();
        String redisVerifyToken = vop.get(token);

        if(!resetPasswordRequest.getEmail().equals(redisVerifyToken)){
            throw new EmailException(EmailErrorCode.NO_VALID_RESET_PASSWORD_EMAIL);
        }

        //JPA Attribute Converter 사용하기
        member.update(passwordEncoder.encode(resetPasswordRequest.getPassword()));

    }




    @Transactional
    private void sendMail(String toEmail, String subject, String template, String data){
        MimeMessage message = mailSender.createMimeMessage();
        try {

            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

//            makeRandomNumber();

            helper.setTo(toEmail);
            helper.setSubject(subject);
            String AddressFrom = "닥터 스터디 <" + setFrom + ">";
            helper.setFrom(AddressFrom);

            Context context = new Context();
            context.setVariable("data", data);

            String htmlContent = templateEngine.process(template, context);
            helper.setText(htmlContent, true);

            mailSender.send(message);

//            return Integer.toString(authNumber);
//            return authNumber;
        } catch(Exception e){
            e.printStackTrace();

//            return "이메일 전송 실패 : " + e.getMessage();
        }
    }



    private String makeUUID(){
        UUID uuid = UUID.randomUUID();
        log.info("uuid = {}", uuid);

        return uuid.toString();
    }


}
