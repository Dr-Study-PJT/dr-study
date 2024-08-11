package com.nomz.doctorstudy.blockinterpreter.blockexecutors.command;

import com.nomz.doctorstudy.blockinterpreter.ProcessContext;
import com.nomz.doctorstudy.blockinterpreter.ProcessLockManager;
import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import com.nomz.doctorstudy.conference.room.SignalTransmitter;
import com.nomz.doctorstudy.conference.room.signal.MuteSignal;
import com.nomz.doctorstudy.conference.room.signal.ParticipantSpeakSignal;
import com.nomz.doctorstudy.conference.room.signal.UnmuteSignal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class LetParticipantSpeakBlockExecutor extends BlockExecutor {
    private final ThreadProcessContext threadProcessContext;
    private final SignalTransmitter signalTransmitter;

    public LetParticipantSpeakBlockExecutor(ThreadProcessContext threadProcessContext, SignalTransmitter signalTransmitter) {
        super(void.class, List.of(Integer.class, Integer.class));
        this.threadProcessContext = threadProcessContext;
        this.signalTransmitter = signalTransmitter;
    }

    @Override
    protected Object executeAction(List<Object> args) {
        int participantNum = (int) args.get(0);
        int speakTimeLimit = (int) args.get(1);

        ProcessContext processContext = threadProcessContext.get();

        long processId = processContext.getId();
        String participantName = processContext.getParticipantName(participantNum);
        Long memberId = processContext.getParticipantMemberId(participantNum);
        Integer numOfParticipant = processContext.getNumOfParticipant();

        for (int i=1; i<=numOfParticipant; i++) {
            if (i == memberId) continue;
            signalTransmitter.transmitSignal(processId, new MuteSignal(memberId));
        }

        log.debug("Participant[id={}, name={}] started to speak. time limit={}", memberId, participantName, speakTimeLimit);
        signalTransmitter.transmitSignal(processId, new ParticipantSpeakSignal(memberId, speakTimeLimit));


        for (int i=1; i<=numOfParticipant; i++) {
            if (i == memberId) continue;
            signalTransmitter.transmitSignal(processId, new UnmuteSignal(memberId));
        }

        ProcessLockManager.sleep(processId);



        return null;
    }

    @Override
    public Object executeGetProgramme(List<Object> args) {
        threadProcessContext.get().addProgrammeInfo("참여자 말하기");

        return null;
    }
}
