package com.nomz.doctorstudy.blockinterpreter.blockexecutors.command;

import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class DecreaseDepthBlockExecutor extends BlockExecutor {
    private final ThreadProcessContext threadProcessContext;
    public DecreaseDepthBlockExecutor(ThreadProcessContext threadProcessContext) {
        super(void.class, List.of());
        this.threadProcessContext = threadProcessContext;
    }

    @Override
    protected Object executeAction(List<Object> args) {
        threadProcessContext.get().decreaseScopeDepth();
        return null;
    }
}
