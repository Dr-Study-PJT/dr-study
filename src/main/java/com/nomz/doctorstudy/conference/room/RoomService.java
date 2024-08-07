package com.nomz.doctorstudy.conference.room;

import com.nomz.doctorstudy.blockinterpreter.BlockInterpreter;
import com.nomz.doctorstudy.blockinterpreter.ProcessContext;
import com.nomz.doctorstudy.blockinterpreter.ProcessManager;
import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.conference.ConferenceErrorCode;
import com.nomz.doctorstudy.conference.room.signal.HeartStopSignal;
import com.nomz.doctorstudy.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoomService {
    private final Map<Long, Set<String>> conferencePeerMap = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<Long, ReentrantLock> joinLockMap = new ConcurrentHashMap<>();
    private final BlockInterpreter blockInterpreter;
    private final ProcessManager processManager;
    private final SignalTransmitter signalTransmitter;

    public void openRoom(Long roomId, String script) {
        conferencePeerMap.put(roomId, new HashSet<>());

        if (joinLockMap.containsKey(roomId)) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_ALREADY_OPENED);
        }
        joinLockMap.put(roomId, new ReentrantLock());

        blockInterpreter.init(roomId, script, Map.of());
    }

    public void startRoom(Long roomId) {
        blockInterpreter.interpret(roomId);
    }

    public void finishRoom(Long roomId) {

    }

    public void closeRoom(Long roomId) {
        if (!joinLockMap.containsKey(roomId)) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_IN_PROCESS);
        }
        joinLockMap.remove(roomId);
        conferencePeerMap.remove(roomId);
        processManager.removeProcess(roomId);
    }

    public List<String> joinRoom(Member member, Long roomId, String peerId) {
        addParticipantIdVariable(roomId, member);

        return addPeer(roomId, peerId);
    }

    public void quitRoom(Member member, Long roomId, String peerId) {
        signalTransmitter.transmitSignal(roomId, new HeartStopSignal(member.getId()));

        removePeer(roomId, peerId);
    }

    private void addParticipantIdVariable(Long roomId, Member member) {
        ProcessContext processContext = processManager.getProcessContext(roomId);
        processContext.addParticipant(member);
    }

    private List<String> addPeer(Long roomId, String peerId) {
        ReentrantLock lock = joinLockMap.get(roomId);
        if (lock == null) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_IN_PROCESS);
        }
        lock.lock();
        Set<String> peerSet = conferencePeerMap.get(roomId);
        List<String> peerIds = peerSet.stream().toList();
        lock.unlock();
        return peerIds;
    }

    private void removePeer(Long roomId, String peerId) {
        ReentrantLock lock = joinLockMap.get(roomId);
        if (lock == null) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_IN_PROCESS);
        }
        lock.lock();
        Set<String> peerSet = conferencePeerMap.get(roomId);
        peerSet.remove(peerId);
        lock.unlock();
    }
}
