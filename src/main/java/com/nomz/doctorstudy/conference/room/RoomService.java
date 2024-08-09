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
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoomService {
    private final Map<Long, Map<Long, String>> existingPeerMap = new ConcurrentHashMap<>();
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

    public void openRoom(Long roomId, String script) {
        existingPeerMap.put(roomId, new HashMap<>());
        joinLockMap.put(roomId, new ReentrantLock());

        blockInterpreter.init(roomId, script, Map.of());
    }

    public void closeRoom(Long roomId) {
        joinLockMap.remove(roomId);
        existingPeerMap.remove(roomId);

        processManager.removeProcess(roomId);
    }

    public void startRoom(Long roomId) {
        if (processManager.getProcessContext(roomId).getStatus() != ProcessStatus.READY) {
            throw new BusinessException(BlockErrorCode.PROCESS_NOT_READY);
        }
        blockInterpreter.interpret(roomId);
    }

    public void finishRoom(Long roomId) {

    }

    public List<String> joinRoom(Member member, Long roomId, String peerId) {
        addParticipantIdVariable(roomId, member);

        List<String> existingPeerIds = addPeer(roomId, member.getId(), peerId);

        log.debug("member:{} joined room", member.getId());

        return existingPeerIds;
    }

    public void quitRoom(Long memberId, Long roomId) {
        log.debug("occurred heartstop from member {}, because of quit", memberId);

        String peerId = removePeer(roomId, memberId);
        signalTransmitter.transmitSignal(roomId, new HeartStopSignal(peerId));
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
}
