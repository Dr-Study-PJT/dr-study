package com.nomz.doctorstudy.conference.room;

import com.nomz.doctorstudy.blockinterpreter.BlockInterpreter;
import com.nomz.doctorstudy.blockinterpreter.ProcessContext;
import com.nomz.doctorstudy.blockinterpreter.ProcessManager;
import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.conference.ConferenceErrorCode;
import com.nomz.doctorstudy.conference.room.signal.HeartStopSignal;
import com.nomz.doctorstudy.member.entity.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoomService {
    private static final Integer TIMEOUT_HEARTSTOP = 60;

    private final Map<Long, Map<Long, String>> existingPeerMap = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<Long, ReentrantLock> joinLockMap = new ConcurrentHashMap<>();
    private final Map<Long, Queue<HeartbeatRecord>> heartbeatQueueMap = new ConcurrentHashMap<>();
    private final Map<Long, Map<Long, Integer>> heartrateMonitorMap = new ConcurrentHashMap<>();

    private final BlockInterpreter blockInterpreter;
    private final ProcessManager processManager;
    private final SignalTransmitter signalTransmitter;

    public void openRoom(Long roomId, String script) {
        existingPeerMap.put(roomId, new HashMap<>());
        joinLockMap.put(roomId, new ReentrantLock());

        heartbeatQueueMap.put(roomId, new ArrayDeque<>());
        heartrateMonitorMap.put(roomId, new HashMap<>());

        blockInterpreter.init(roomId, script, Map.of());
    }

    public void closeRoom(Long roomId) {
        joinLockMap.remove(roomId);
        existingPeerMap.remove(roomId);

        heartbeatQueueMap.remove(roomId);
        heartrateMonitorMap.remove(roomId);

        processManager.removeProcess(roomId);
    }

    public void startRoom(Long roomId) {
        blockInterpreter.interpret(roomId);
    }

    public void finishRoom(Long roomId) {

    }

    public List<String> joinRoom(Member member, Long roomId, String peerId) {
        addParticipantIdVariable(roomId, member);

        List<String> existingPeerIds = addPeer(roomId, member.getId(), peerId);

        heartrateMonitorMap.get(roomId).put(member.getId(), 0);
        log.debug("member:{} joined room", member.getId());

        return existingPeerIds;
    }

    public void quitRoom(Member member, Long roomId) {
        log.debug("occurred heartstop from member {}, because of quit", member.getId());

        String peerId = removePeer(roomId, member.getId());
        signalTransmitter.transmitSignal(roomId, new HeartStopSignal(peerId));

        heartrateMonitorMap.remove(member.getId());
    }

    private void addParticipantIdVariable(Long roomId, Member member) {
        ProcessContext processContext = processManager.getProcessContext(roomId);
        processContext.addParticipant(member);
    }

    private List<String> addPeer(Long roomId, Long memberId, String peerId) {
        ReentrantLock lock = joinLockMap.get(roomId);
        if (lock == null) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_OPENED);
        }
        lock.lock();
        List<String> existingPeerIds = new ArrayList<>(existingPeerMap.get(roomId).values());
        existingPeerMap.get(roomId).put(memberId, peerId);
        log.debug("joined new peer, current existingPeerIds = {}", existingPeerMap.get(roomId));
        lock.unlock();
        return existingPeerIds;
    }

    private String removePeer(Long roomId, Long memberId) {
        ReentrantLock lock = joinLockMap.get(roomId);
        if (lock == null) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_OPENED);
        }
        lock.lock();
        String peerId = existingPeerMap.get(roomId).get(memberId);
        existingPeerMap.get(roomId).remove(memberId);
        lock.unlock();

        return peerId;
    }

    public void updateHeartbeat(Long roomId, Long memberId) {
        Map<Long, Integer> heartrateMonitor = heartrateMonitorMap.get(roomId);
        heartrateMonitor.replace(memberId, heartrateMonitor.get(memberId) + 1);

        Queue<HeartbeatRecord> heartbeatRecordQueue = heartbeatQueueMap.get(roomId);
        heartbeatRecordQueue.add(new HeartbeatRecord(memberId, LocalDateTime.now()));

        while (!heartbeatRecordQueue.isEmpty()) {
            HeartbeatRecord frontHeartbeat = heartbeatRecordQueue.peek();
            log.debug("frontHeartBeat memberId = {}", frontHeartbeat.getMemberId());
            if (!existingPeerMap.containsKey(frontHeartbeat.getMemberId())) {
                heartbeatRecordQueue.remove();
                continue;
            }
            if ((frontHeartbeat.getTime().plusSeconds(TIMEOUT_HEARTSTOP).isAfter(LocalDateTime.now()))) {
                break;
            }

            Integer heartrate = heartrateMonitor.get(frontHeartbeat.getMemberId());
            if (heartrate == 0) {
                log.debug("occurred heartstop from member {}, because of timeout", frontHeartbeat.getMemberId());
                String peerId = removePeer(roomId, frontHeartbeat.getMemberId());
                signalTransmitter.transmitSignal(roomId, new HeartStopSignal(peerId));
            }

            heartbeatRecordQueue.remove();
        }
    }

    @Getter
    @RequiredArgsConstructor
    private static class HeartbeatRecord {
        private final long memberId;
        private final LocalDateTime time;
    }
}
