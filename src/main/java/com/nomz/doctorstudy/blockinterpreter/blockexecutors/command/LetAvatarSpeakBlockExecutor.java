package com.nomz.doctorstudy.blockinterpreter.blockexecutors.command;

import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import com.nomz.doctorstudy.conference.room.signal.MuteSignal;
import com.nomz.doctorstudy.conference.room.signal.SignalSender;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class LetAvatarSpeakBlockExecutor extends BlockExecutor {
    private final ThreadProcessContext threadProcessContext;
    private final SignalSender signalSender;

    public LetAvatarSpeakBlockExecutor(ThreadProcessContext threadProcessContext, SignalSender signalSender) {
        super(void.class, List.of(String.class));
        this.threadProcessContext = threadProcessContext;
        this.signalSender = signalSender;
    }

    @Override
    protected Object executeAction(List<Object> args) {
        log.debug("let ai speak!");

        return null;
    }

    @Override
    public Object executeGetProgramme(List<Object> args) {
        threadProcessContext.addProgrammeInfo("AI 말하기");

        return null;
    }
}
