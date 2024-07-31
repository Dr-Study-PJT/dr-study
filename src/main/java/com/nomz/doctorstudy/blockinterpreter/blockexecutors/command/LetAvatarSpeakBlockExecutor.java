package com.nomz.doctorstudy.blockinterpreter.blockexecutors.command;

import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class LetAvatarSpeakBlockExecutor extends BlockExecutor {
    private final ThreadProcessContext threadProcessContext;

    public LetAvatarSpeakBlockExecutor(ThreadProcessContext threadProcessContext) {
        super(void.class, List.of(String.class));
        this.threadProcessContext = threadProcessContext;
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
