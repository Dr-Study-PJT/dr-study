package com.nomz.doctorstudy.blockinterpreter;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@Slf4j
class ProcessLockManagerTest {
    @Test
    @DisplayName("Sleep, Awaken 테스트")
    void sleepAwakenTest() throws InterruptedException {
        Thread thread1 = new Thread(() -> {
            log.info("start to sleep");
            ProcessLockManager.sleep(1L);
            log.info("being awaken");
        }, "thread1");

        Thread thread2 = new Thread(() -> {
            log.info("start to sleep");
            ProcessLockManager.sleep(2L);
            log.info("being awaken");
        }, "thread2");

        thread1.start();
        thread2.start();

        Thread.sleep(3000L);
        ProcessLockManager.awaken(2L);

        Thread.sleep(3000L);
        ProcessLockManager.awaken(1L);
    }
}