package com.nomz.doctorstudy.blockinterpreter.blockexecutors.command;

import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class LetParticipantSpeakBlockExecutor extends BlockExecutor {
    private final ThreadProcessContext threadProcessContext;

    public LetParticipantSpeakBlockExecutor(ThreadProcessContext threadProcessContext) {
        super(void.class, List.of(Integer.class, Integer.class));
        this.threadProcessContext = threadProcessContext;
    }

    @Override
    protected Object executeAction(List<Object> args) {
        log.debug("let participant speak!");

        return null;
    }

    @Override
    public Object executeGetProgramme(List<Object> args) {
        threadProcessContext.addProgrammeInfo("참여자 말하기");

        return null;
    }
}
