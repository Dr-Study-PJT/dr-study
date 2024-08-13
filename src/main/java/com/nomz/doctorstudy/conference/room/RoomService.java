package com.nomz.doctorstudy.conference.room;

import com.nomz.doctorstudy.blockinterpreter.*;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockVariable;
import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.conference.ConferenceErrorCode;
import com.nomz.doctorstudy.conference.QuitMemberInfo;
import com.nomz.doctorstudy.conference.room.signal.HeartStopSignal;
import com.nomz.doctorstudy.conference.room.signal.JoiningSignal;
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
    private final Map<Long, Map<Long, RoomParticipantInfo>> existingParticipantMap = new ConcurrentHashMap<>();
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

    public void openRoom(Long roomId) {
        existingParticipantMap.put(roomId, new LinkedHashMap<>());
        joinLockMap.put(roomId, new ReentrantLock());
    }

    public void closeRoom(Long roomId) {
        joinLockMap.remove(roomId);
        existingParticipantMap.remove(roomId);
    }

    public void startRoom(Long roomId, String subject, String script, String prePrompt, Runnable finishCallback) {
        log.info("========== STARTING WITH PROGRAMME MODE ==========");
        blockInterpreter.init(
                roomId,
                script,
                Map.of(BlockVariable.STUDY_SUBJECT.getToken(), subject),
                ConferenceContext.builder()
                        .prePrompt(prePrompt)
                        .subject(subject)
                        .participantInfoList(existingParticipantMap.get(roomId).values().stream().toList())
                        .build()
        );
        blockInterpreter.interpret(roomId, ProcessMode.PROGRAMME);
        log.info("========== FINISHED PROGRAMME MODE ==========");

        log.info("========== STARTING WITH NORMAL MODE ==========");
        blockInterpreter.init(
                roomId,
                script,
                Map.of(BlockVariable.STUDY_SUBJECT.getToken(), subject),
                ConferenceContext.builder()
                        .prePrompt(prePrompt)
                        .subject(subject)
                        .participantInfoList(existingParticipantMap.get(roomId).values().stream().toList())
                        .build()
        );
        processThreadMap.put(roomId, CompletableFuture.runAsync(() -> {
            blockInterpreter.interpret(roomId);
        }).thenRun(() -> {
            log.info("========== FINISHED NORMAL MODE ==========");
            finishCallback.run();
        }));
    }

    public void finishRoom(Long roomId) {
        processManager.removeProcess(roomId);
        
        //TODO: Quit 신호 보내기 할 것

        CompletableFuture<Void> completableFuture = processThreadMap.get(roomId);
        if (completableFuture.isDone()) {
            log.warn("Room:{}의 Completable Future가 완료돼지 않았습니다.", roomId);
            completableFuture.cancel(true);
        }
        if (!completableFuture.isDone() && !completableFuture.isCancelled()) {
            throw new BusinessException(RoomErrorCode.EXISTING_PROCESS_RUNNING);
        }

        // TODO: Finish Callback
        log.debug("Room:{} finished", roomId);
    }

    public List<String> joinRoom(Member member, Long roomId, String peerId) {
        if (!existingParticipantMap.containsKey(roomId)) {
            throw new BusinessException(RoomErrorCode.ROOM_NOT_FOUND);
        }

        log.debug("New Participant[memberId={}, name={}, peerId={}] is trying to join. Current participant list={}",
                member.getId(), member.getNickname(), peerId, existingParticipantMap.get(roomId).values()
        );

        if (existingParticipantMap.get(roomId).containsKey(member.getId())) {
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
    }

    private List<String> addPeer(Long roomId, Member member, String peerId) {
        ReentrantLock lock = joinLockMap.get(roomId);
        if (lock == null) {
            throw new BusinessException(ConferenceErrorCode.CONFERENCE_NOT_OPENED);
        }
        lock.lock();

        List<String> existingPeerIds = existingParticipantMap.get(roomId).values().stream().map(RoomParticipantInfo::getPeerId).toList();
        existingParticipantMap.get(roomId).put(member.getId(), new RoomParticipantInfo(member.getId(), member.getNickname(), peerId));

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
