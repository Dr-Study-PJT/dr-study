package com.nomz.doctorstudy.blockinterpreter.blockexecutors.command;

import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class DeclareVariableBlockExecutor extends BlockExecutor {
    private final ThreadProcessContext threadProcessContext;
    public DeclareVariableBlockExecutor(ThreadProcessContext threadProcessContext) {
        super(void.class, List.of(String.class));
        this.threadProcessContext = threadProcessContext;
    }

    @Override
    protected Object executeAction(List<Object> args) {
        String varName = (String) args.get(0);
        threadProcessContext.get().declareVariable(varName);
        return null;
    }
}
