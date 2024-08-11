package com.nomz.doctorstudy.conference.room;

import com.nomz.doctorstudy.blockinterpreter.*;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockVariable;
import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.conference.ConferenceErrorCode;
import com.nomz.doctorstudy.conference.room.signal.HeartStopSignal;
import com.nomz.doctorstudy.member.entity.Member;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoomService {
    private final Map<Long, Map<Long, RoomParticipantInfo>> existingParticipantMap = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<Long, ReentrantLock> joinLockMap = new ConcurrentHashMap<>();
    private final WebSocketSessionManager webSocketSessionManager;

    private final ProcessManager processManager;
    private final SignalTransmitter signalTransmitter;
    private final BlockInterpreter blockInterpreter;

    @PostConstruct
    public void setWebsocketDisconnectCallback() {
        webSocketSessionManager.setDisconnectCallback(sessionData -> {
            quitRoom(sessionData.getMemberId(), sessionData.getRoomId());
        });
    }

    public void openRoom(Long roomId) {
        existingParticipantMap.put(roomId, new LinkedHashMap<>());
        joinLockMap.put(roomId, new ReentrantLock());
    }

    public void closeRoom(Long roomId) {
        joinLockMap.remove(roomId);
        existingParticipantMap.remove(roomId);
    }

    public void startRoom(Long roomId, String subject, String script, Runnable finishCallback) {
        ProcessContext processContext;

        log.info("========== STARTING WITH PROGRAMME MODE ==========");
        blockInterpreter.init(roomId, script, Map.of(BlockVariable.STUDY_SUBJECT.getToken(), subject));
        processContext = processManager.getProcessContext(roomId);
        processContext.setParticipantInfo(existingParticipantMap.get(roomId).values().stream().toList());
        blockInterpreter.interpret(roomId, ProcessMode.PROGRAMME);
        log.info("========== FINISHED PROGRAMME MODE ==========");

        log.info("========== STARTING WITH NORMAL MODE ==========");
        blockInterpreter.init(roomId, script, Map.of());
        processContext = processManager.getProcessContext(roomId);
        processContext.setParticipantInfo(existingParticipantMap.get(roomId).values().stream().toList());
        CompletableFuture.runAsync(() -> {
            blockInterpreter.interpret(roomId);
        }).thenRun(() -> {
            log.info("========== FINISHED NORMAL MODE ==========");
            finishRoom(roomId);
            finishCallback.run();
        });
    }

    public void finishRoom(Long roomId) {
        processManager.removeProcess(roomId);
        // TODO: Finish Callback
        log.debug("Room:{} finished", roomId);
    }

    public List<String> joinRoom(Member member, Long roomId, String peerId) {
        List<String> existingPeerIds = addPeer(roomId, member, peerId);

        log.debug("member:{} joined room", member.getId());

        return existingPeerIds;
    }

    public void quitRoom(Long memberId, Long roomId) {
        log.debug("occurred heartstop from member {}, because of quit", memberId);

        String peerId = removePeer(roomId, memberId);
        signalTransmitter.transmitSignal(roomId, new HeartStopSignal(peerId));
    }

    private List<String> addPeer(Long roomId, Member member, String peerId) {
        ReentrantLock lock = joinLockMap.get(roomId);
        if (lock == null) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_OPENED);
        }
        lock.lock();

        List<String> existingPeerIds = existingParticipantMap.get(roomId).values().stream().map(RoomParticipantInfo::getPeerId).toList();
        existingParticipantMap.get(roomId).put(member.getId(), new RoomParticipantInfo(member.getId(), member.getNickname(), peerId));

        log.debug("joined new peer, current existingPeerIds = {}", existingParticipantMap.get(roomId));

        lock.unlock();

        return existingPeerIds;
    }

    private String removePeer(Long roomId, Long memberId) {
        ReentrantLock lock = joinLockMap.get(roomId);
        if (lock == null) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_OPENED);
        }
        lock.lock();

        String peerId = existingParticipantMap.get(roomId).get(memberId).getPeerId();
        existingParticipantMap.get(roomId).remove(memberId);

        lock.unlock();

        return peerId;
    }
}
