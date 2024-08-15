package com.nomz.doctorstudy.conference.room;

import com.nomz.doctorstudy.blockinterpreter.*;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockVariable;
import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.conference.ConferenceErrorCode;
import com.nomz.doctorstudy.conference.QuitMemberInfo;
import com.nomz.doctorstudy.conference.room.signal.HeartStopSignal;
import com.nomz.doctorstudy.conference.room.signal.JoiningSignal;
import com.nomz.doctorstudy.conference.room.signal.QuitSignal;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.exception.member.MemberErrorCode;
import com.nomz.doctorstudy.member.exception.member.MemberException;
import com.nomz.doctorstudy.member.repository.MemberRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;
import java.util.function.Consumer;

@Slf4j
@Service
@RequiredArgsConstructor
public class RoomService {
    private final Map<Long, Map<Long, RoomParticipantInfo>> roomParticipantMap = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<Long, ReentrantLock> joinLockMap = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<Long, CompletableFuture<Void>> processThreadMap = new ConcurrentHashMap<>();
    private final WebSocketSessionManager webSocketSessionManager;

    private final ProcessManager processManager;
    private final SignalTransmitter signalTransmitter;
    private final BlockInterpreter blockInterpreter;
    private final MemberRepository memberRepository;

    @Setter
    private Consumer<QuitMemberInfo> quitMemberCallback;

    @PostConstruct
    public void setWebsocketConnectCallback() {
        webSocketSessionManager.setConnectCallback(sessionData -> {
            Member member = memberRepository.findById(sessionData.getMemberId())
                    .orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_NOT_FOUND_ERROR));
            signalTransmitter.transmitSignal(
                    sessionData.getRoomId(),
                    new JoiningSignal(member.getId(), member.getNickname(), member.getImage().getImageUrl())
            );
        });
    }

    @PostConstruct
    public void setWebsocketDisconnectCallback() {
        webSocketSessionManager.setDisconnectCallback(sessionData -> {
            quitRoom(sessionData.getMemberId(), sessionData.getRoomId());
        });
    }

    public List<RoomParticipantInfo> getParticipants(Long roomId) {
        if (!roomParticipantMap.containsKey(roomId)) {
            throw new BusinessException(RoomErrorCode.ROOM_NOT_FOUND);
        }
        return roomParticipantMap.get(roomId).values().stream().toList();
    }

    public void openRoom(Long roomId) {
        roomParticipantMap.put(roomId, new LinkedHashMap<>());
        joinLockMap.put(roomId, new ReentrantLock());
    }

    public void closeRoom(Long roomId) {
        signalTransmitter.transmitSignal(roomId, new QuitSignal());
        joinLockMap.remove(roomId);
        roomParticipantMap.remove(roomId);
    }

    public void startRoom(Long roomId, String script, ConferenceContext conferenceContext, Runnable finishCallback) {
        log.info("========== STARTING WITH PROGRAMME MODE ==========");
        blockInterpreter.init(roomId, script, Map.of(), conferenceContext);
        blockInterpreter.interpret(roomId, ProcessMode.PROGRAMME);
        log.info("========== FINISHED PROGRAMME MODE ==========");

        log.info("========== STARTING WITH NORMAL MODE ==========");
        blockInterpreter.init(roomId, script, Map.of(), conferenceContext);

        CompletableFuture<Void> completableFuture = processThreadMap.get(roomId);
        if (completableFuture != null && !completableFuture.isDone() && !completableFuture.isCancelled()) {
            completableFuture.cancel(true);
        }

        processThreadMap.put(roomId, CompletableFuture.runAsync(() -> {
            blockInterpreter.interpret(roomId);
        }).thenRun(() -> {
            log.info("========== FINISHED NORMAL MODE ==========");
            finishCallback.run();
        }));
    }

    public void finishRoom(Long roomId) {
        processManager.removeProcess(roomId);

        CompletableFuture<Void> completableFuture = processThreadMap.get(roomId);
        if (completableFuture != null) {
            if (!completableFuture.isDone()) {
                log.warn("Room:{}의 Process가 아직 진행중입니다.", roomId);
                completableFuture.cancel(true);
            }
        }

        log.debug("Finished room:{}", roomId);
    }

    public List<String> joinRoom(Member member, Long roomId, String peerId) {
        if (!roomParticipantMap.containsKey(roomId)) {
            throw new BusinessException(RoomErrorCode.ROOM_NOT_FOUND);
        }

        log.debug("New Participant[memberId={}, name={}, peerId={}] is trying to join. Current participant list={}",
                member.getId(), member.getNickname(), peerId, roomParticipantMap.get(roomId).values()
        );

        if (roomParticipantMap.get(roomId).containsKey(member.getId())) {
            throw new BusinessException(RoomErrorCode.PARTICIPANT_ALREADY_JOINED);
        }

        List<String> existingPeerIds = addPeer(roomId, member, peerId);

        return existingPeerIds;
    }

    public void quitRoom(Long memberId, Long roomId) {
        log.debug("Member:{} quit from room:{}", memberId, roomId);

        String peerId = removePeer(roomId, memberId);
        signalTransmitter.transmitSignal(roomId, new HeartStopSignal(memberId, peerId));

        quitMemberCallback.accept(new QuitMemberInfo(roomId, memberId));
        
        if (roomParticipantMap.get(roomId).isEmpty()) {
            finishRoom(roomId);
            closeRoom(roomId);
        }
    }

    private List<String> addPeer(Long roomId, Member member, String peerId) {
        ReentrantLock lock = joinLockMap.get(roomId);
        if (lock == null) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_OPENED);
        }
        lock.lock();
        try {
            List<String> existingPeerIds = roomParticipantMap.get(roomId).values().stream().map(RoomParticipantInfo::getPeerId).toList();
            roomParticipantMap.get(roomId).put(member.getId(), new RoomParticipantInfo(member.getId(), member.getNickname(), peerId));
            return existingPeerIds;
        } catch (Exception e) {
            log.error("Unexpected error occurred while joining room", e);
            throw new BusinessException(RoomErrorCode.PARTICIPANT_JOIN_FAILED);
        }
        finally {
            lock.unlock();
        }
    }

    private String removePeer(Long roomId, Long memberId) {
        ReentrantLock lock = joinLockMap.get(roomId);
        if (lock == null) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_OPENED);
        }
        lock.lock();
        try {
            String peerId = roomParticipantMap.get(roomId).get(memberId).getPeerId();
            roomParticipantMap.get(roomId).remove(memberId);
            return peerId;
        } catch (Exception e) {
            log.error("Unexpected error occurred while quiting room", e);
            throw new BusinessException(RoomErrorCode.PARTICIPANT_JOIN_FAILED);
        }
        finally {
            lock.unlock();
        }
    }
}
