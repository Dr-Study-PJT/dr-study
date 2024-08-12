package com.nomz.doctorstudy.member.service;

import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.exception.member.MemberErrorCode;
import com.nomz.doctorstudy.member.exception.member.MemberException;
import com.nomz.doctorstudy.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
@ActiveProfiles("local")
//@Transactional
class MemberServiceTest {
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MemberService memberService;

    @Test
    @Transactional
    void deleteMember() {
        Member member = memberRepository.findById(1L)
                .orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_NOT_FOUND_ERROR));

        log.info("member = {}", member.getEmail());
        memberService.deleteMember(member.getId());

        Assertions.assertThat(member.isLeaved()).isEqualTo(true);
//        Assertions.assertThat(member.getLeavedDate()).isEqualTo(LocalDateTime.now());

    }
}