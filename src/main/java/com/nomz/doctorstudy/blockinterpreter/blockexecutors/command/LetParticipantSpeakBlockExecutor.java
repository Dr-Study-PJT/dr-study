package com.nomz.doctorstudy.blockinterpreter.blockexecutors.command;

import com.nomz.doctorstudy.blockinterpreter.ProcessContext;
import com.nomz.doctorstudy.blockinterpreter.ProcessLockManager;
import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import com.nomz.doctorstudy.conference.room.RoomParticipantInfo;
import com.nomz.doctorstudy.conference.room.SignalTransmitter;
import com.nomz.doctorstudy.conference.room.SignalUtils;
import com.nomz.doctorstudy.conference.room.signal.NextStepSignal;
import com.nomz.doctorstudy.conference.room.signal.ParticipantSpeakSignal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class LetParticipantSpeakBlockExecutor extends BlockExecutor {
    private final ThreadProcessContext threadProcessContext;
    private final SignalTransmitter signalTransmitter;
    private final SignalUtils signalUtils;

    public LetParticipantSpeakBlockExecutor(ThreadProcessContext threadProcessContext, SignalTransmitter signalTransmitter, SignalUtils signalUtils) {
        super(void.class, List.of(Integer.class, Integer.class));
        this.threadProcessContext = threadProcessContext;
        this.signalTransmitter = signalTransmitter;
        this.signalUtils = signalUtils;
    }

    @Override
    protected Object executeAction(List<Object> args) {
        int participantNum = (int) args.get(0);
        int speakMillisTimeLimit = (int) args.get(1) * 1000;

        ProcessContext processContext = threadProcessContext.get();

        long processId = processContext.getId();
        String participantName = processContext.getParticipantName(participantNum);
        Long speakMemberId = processContext.getParticipantMemberId(participantNum);

        signalUtils.sendMuteSignals(processId, processContext.getParticipantInfoList().stream()
                .map(RoomParticipantInfo::getMemberId)
                .filter(id -> !id.equals(speakMemberId))
                .toList()
        );

        log.debug("Participant[id={}, name={}] started to speak. time limit={}", speakMemberId, participantName, speakMillisTimeLimit);
        signalTransmitter.transmitSignal(processId, new ParticipantSpeakSignal(speakMemberId, speakMillisTimeLimit));

        ProcessLockManager.sleep(processId);

        signalUtils.sendUnmuteSignals(processId, processContext.getParticipantInfoList().stream()
                .map(RoomParticipantInfo::getMemberId)
                .filter(id -> !id.equals(speakMemberId))
                .toList()
        );

        signalTransmitter.transmitSignal(processId, new NextStepSignal());

        return null;
    }

    @Override
    public Object executeGetProgramme(List<Object> args) {
        int participantNum = (int) args.get(0);
        int speakTimeLimit = (int) args.get(1);

        ProcessContext processContext = threadProcessContext.get();
        String participantName = processContext.getParticipantName(participantNum);
        Long memberId = processContext.getParticipantMemberId(participantNum);

        threadProcessContext.get().addProgrammeItem(Map.of("nickname", participantName, "time", speakTimeLimit));

        return null;
    }
}
