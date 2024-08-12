package com.nomz.doctorstudy.blockinterpreter;

import lombok.extern.slf4j.Slf4j;

import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Slf4j
public class ProcessLockManager {
    private static final Map<Long, Object> lockMap = new ConcurrentHashMap<>();

    public static void sleep(Long processId)  {
        Object lock = new Object();

        Object existingLock = lockMap.putIfAbsent(processId, lock);
        if (existingLock != null) {
            throw new BlockException(BlockErrorCode.PROCESS_ALREADY_SLEEP);
        }

        synchronized (lock) {
            try {
                log.debug("Process:{} started to sleep", processId);
                lock.wait();
                // TODO: callback 추가?
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new BlockException(BlockErrorCode.PROCESS_INTERRUPTED, e);
            }
        }
    }

    public static void awaken(Long processId) {
        Object lock = lockMap.get(processId);
        if (lock == null) {
            throw new BlockException(BlockErrorCode.PROCESS_ALREADY_AWAKE);
        }

        synchronized (lock) {
            log.debug("Process:{} is awoken", processId);
            lock.notify();
            lockMap.remove(processId);
        }
    }

    public static void sleep(Long processId, int millisTime) {
        CompletableFuture.runAsync(() -> {
            ProcessLockManager.awaken(processId);
        }, CompletableFuture.delayedExecutor(millisTime, TimeUnit.MILLISECONDS));
        log.debug("WaitBlock: start sleep {} sec", (double) millisTime / 1000.0);
        ProcessLockManager.sleep(processId);
    }
}
