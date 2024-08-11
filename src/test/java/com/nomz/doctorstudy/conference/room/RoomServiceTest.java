package com.nomz.doctorstudy.conference.room;

import com.nomz.doctorstudy.blockinterpreter.ProcessLockManager;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@Slf4j
@SpringBootTest
class RoomServiceTest {
    @Autowired
    private RoomService roomService;
    @Autowired
    private MemberRepository memberRepository;

    private long nextSequence = 1;

    private long getNextIdSequence() {
        System.out.println("id = " + nextSequence);
        return nextSequence++;
    }

    @Test
    @DisplayName("참여자 인원 수 테스트")
    void numOfParticipantTest() throws InterruptedException {
        long roomId = getNextIdSequence();
        Member member1 = memberRepository.findById(1L).get();
        Member member2 = memberRepository.findById(2L).get();

        roomService.openRoom(roomId);
        roomService.joinRoom(member1, roomId, "this is member1's peer id");
        roomService.joinRoom(member2, roomId, "this is member2's peer id");

        Object lock = new Object();
        roomService.startRoom(roomId, "테스트 주제!", """
                phase(1) {
                    log(string_concat('참여자 인원 수 = ', int_to_string(get_num_of_participant())));
                    wait(1000);
                }
                    """,
                () -> {
                    log.debug("time to notify");
                    synchronized (lock) {
                        lock.notify();
                    }
                });

        synchronized (lock) {
            log.debug("time to wait");
            lock.wait();
        }
    }
    
    @Test
    @DisplayName("참여자 이름 테스트")
    void getParticipantNameTest() throws InterruptedException {
        long roomId = getNextIdSequence();
        Member member1 = memberRepository.findById(1L).get();
        Member member2 = memberRepository.findById(2L).get();

        roomService.openRoom(roomId);
        roomService.joinRoom(member1, roomId, "this is member1's peer id");
        roomService.joinRoom(member2, roomId, "this is member2's peer id");

        Object lock = new Object();
        roomService.startRoom(roomId, "테스트 주제!", """
                phase(1) {
                    loop(get_num_of_participant()) {
                        log(string_concat(
                                '참여자 이름=\\'',
                                get_participant_name(get_num_of_iteration()),
                                '\\''
                            )
                        );
                        wait(1000);
                    }
                }
                    """,
                () -> {
                    log.debug("time to notify");
                    synchronized (lock) {
                        lock.notify();
                    }
                });

        synchronized (lock) {
            log.debug("time to wait");
            lock.wait();
        }
    }
}