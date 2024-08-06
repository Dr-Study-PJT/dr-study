package com.nomz.doctorstudy.conference.service;

import com.nomz.doctorstudy.conference.entity.Conference;
import com.nomz.doctorstudy.conference.entity.ConferenceMember;
import com.nomz.doctorstudy.conference.entity.ConferenceMemberId;
import com.nomz.doctorstudy.conference.repository.ConferenceMemberInviteRepository;
import com.nomz.doctorstudy.conference.repository.ConferenceMemberRepository;
import com.nomz.doctorstudy.conference.repository.ConferenceRepository;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.repository.MemberRepository;
import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import com.nomz.doctorstudy.studygroup.repository.StudyGroupRepository;
import lombok.extern.slf4j.Slf4j;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@SpringBootTest
class ConferenceServiceImplTest {
    @Autowired
    private ConferenceRepository conferenceRepository;

    @Autowired
    private ConferenceMemberRepository conferenceMemberRepository;

    @Autowired
    private ConferenceMemberInviteRepository conferenceMemberInviteRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private StudyGroupRepository studyGroupRepository;


    @Test
    @DisplayName("데이터 삽입용")
    @Transactional
    @Commit
    public void insertData() {
        final int cnt = 5;
        Conference conference = conferenceRepository.findById(1L)
                .orElseGet(() -> conferenceRepository.save(Conference.builder()
                                .title("conference1")
                                .host(null)
                                .memberCapacity(10)
                                .startTime(LocalDateTime.now())
                                .finishTime(LocalDateTime.now().plusDays(2).plusHours(3).plusMinutes(30).plusSeconds(50))
                                .build()
                        )
                );

        List<ConferenceMember> beforeConferenceMembers = conferenceMemberRepository.findByConferenceId(1L);

        for (int i=0; i<cnt; i++) {
            Member member = Member.builder()
                    .email(String.format("member%d%d%d@gmail.com", i, i, i))
                    .password("password")
                    .nickname("nick" + i + i + i)
                    .image(null)
                    .build();

            memberRepository.save(member);

            ConferenceMember conferenceMember = ConferenceMember.of(conference, member);
            conferenceMemberRepository.save(conferenceMember);
        }

        List<ConferenceMember> afterConferenceMembers = conferenceMemberRepository.findByConferenceId(1L);

        Assertions.assertThat(afterConferenceMembers.size()).isEqualTo(beforeConferenceMembers.size() + cnt);
    }

    @Test
    @DisplayName("템플릿 테스트")
    void templateTest() {
        int asdf = 1;
    }

    @Test
    @DisplayName("컨퍼런스 참여 리스트 테스트")
    @Transactional
    void conferenceMemberTest() {
        // given
        Member hostMember = Member.builder()
                .email("asdf@naver.com")
                .password("password")
                .nickname("hamsteak")
                .regDate(LocalDateTime.now())
                .isLeaved(false)
                .build();
        memberRepository.save(hostMember);

        StudyGroup studyGroup = StudyGroup.builder()
                .captain(hostMember)
                .memberCapacity(10)
                .name("asdf")
                .goal("asdf")
                .description("asdf")
                .createdAt(LocalDateTime.now())
                .isDeleted(false)
                .build();
        studyGroupRepository.save(studyGroup);

        Conference conference = Conference.builder()
                .host(hostMember)
                .studyGroup(studyGroup)
                .memberCapacity(10)
                .title("컨퍼런스1")
                .subject("주제1")
                .build();
        conferenceRepository.save(conference);


        // when
        ConferenceMember conferenceMember = ConferenceMember.of(conference, hostMember);
        conferenceMemberRepository.save(conferenceMember);

        // then
        List<ConferenceMember> conferenceMembers = conferenceMemberRepository.findByConferenceId(conference.getId());
        Assertions.assertThat(conferenceMembers).containsOnly(conferenceMember);
    }
}