package com.nomz.doctorstudy.conference.room;

import com.nomz.doctorstudy.blockinterpreter.BlockInterpreter;
import com.nomz.doctorstudy.blockinterpreter.ProcessContext;
import com.nomz.doctorstudy.blockinterpreter.ProcessManager;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockVariable;
import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.conference.ConferenceErrorCode;
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

    public void closeRoom(Long roomId) {
        if (!joinLockMap.containsKey(roomId)) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_IN_PROCESS);
        }
        joinLockMap.remove(roomId);
        conferencePeerMap.remove(roomId);
        processManager.removeProcess(roomId);
    }

    public List<String> joinRoom(Member member, Long roomId, String peerId) {
        List<String> peerIds;
        ReentrantLock lock = joinLockMap.get(roomId);
        if (lock == null) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_IN_PROCESS);
        }

        lock.lock();
        try {
            Set<String> peerSet = conferencePeerMap.get(roomId);
            peerIds = peerSet.stream().toList();
            peerSet.add(peerId);
        } finally {
            lock.unlock();
        }

        addParticipantIdVariable(roomId, member);

        return peerIds;
    }

    private void addParticipantIdVariable(Long roomId, Member member) {
        ProcessContext processContext = processManager.getProcessContext(roomId);
        processContext.addParticipant(member);
    }
}
