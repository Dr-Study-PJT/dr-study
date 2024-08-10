package com.nomz.doctorstudy.blockinterpreter;

import lombok.extern.slf4j.Slf4j;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

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
}
