package com.nomz.doctorstudy.conference.room;

import com.nomz.doctorstudy.blockinterpreter.*;
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
    private final Map<Long, Map<Long, ParticipantInfo>> existingParticipantMap = new ConcurrentHashMap<>();
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

        processManager.removeProcess(roomId);
    }

    public void startRoom(Long roomId, String script, Runnable finishCallback) {
        ProcessContext processContext;

        blockInterpreter.init(roomId, script, Map.of());
        processContext = processManager.getProcessContext(roomId);
        processContext.setParticipantInfo(
                existingParticipantMap.keySet().stream().toList(),
                existingParticipantMap.keySet().stream().map(id -> "member" + id + "'s nickname").toList()
        );
        blockInterpreter.interpret(roomId, ProcessMode.PROGRAMME);


        if (processContext.getStatus() != ProcessStatus.READY) {
            throw new BusinessException(BlockErrorCode.PROCESS_NOT_READY);
        }

        blockInterpreter.init(roomId, script, Map.of());
        processContext = processManager.getProcessContext(roomId);
        processContext.setParticipantInfo(
                existingParticipantMap.keySet().stream().toList(),
                existingParticipantMap.keySet().stream().map(id -> "member" + id + "'s nickname").toList()
        );

        CompletableFuture.runAsync(() -> {
            blockInterpreter.interpret(roomId);
        }).thenRun(finishCallback);
    }

    public void setFinishCallback(Long roomId) {
        // TODO: Finish Callback
        log.debug("컨퍼런스{}번 진행 종료", roomId);
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

        List<String> existingPeerIds = existingParticipantMap.get(roomId).values().stream().map(ParticipantInfo::getPeerId).toList();
        existingParticipantMap.get(roomId).put(member.getId(), new ParticipantInfo(member.getNickname(), peerId));

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
