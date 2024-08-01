package com.nomz.doctorstudy.conference.service;

import com.nomz.doctorstudy.conference.entity.Conference;
import com.nomz.doctorstudy.conference.repository.ConferenceMemberInviteRepository;
import com.nomz.doctorstudy.conference.repository.ConferenceMemberRepository;
import com.nomz.doctorstudy.conference.repository.ConferenceRepository;
import com.nomz.doctorstudy.member.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@Slf4j
@SpringBootTest
class ConferenceServiceImplTest {
    @Autowired
    private ConferenceRepository conferenceRepository;

    @Autowired
    private ConferenceMemberRepository conferenceMemberRepository;

    @Autowired
    private ConferenceMemberInviteRepository conferenceMemberInviteRepository;


    @Test
    @DisplayName("템플릿 테스트")
    void templateTest() {
        int asdf = 1;
    }
    
    @Test
    @DisplayName("컨퍼런스 참여 리스트 테스트")
    void conferenceMemberTest() {
//        // given
//        Member.builder()
//                .i
//
//        Conference conference = Conference.builder()
//                .id(null)
//                .host(1L)
//                .memberCapacity(10)
//                .title("컨퍼런스1")
//                .build()

        // when


        // then


    }
}