package com.nomz.doctorstudy.blockinterpreter.blockexecutors.command;

import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class SetStringVariableBlockExecutor extends BlockExecutor {
    private final ThreadProcessContext threadProcessContext;

    public SetStringVariableBlockExecutor(ThreadProcessContext threadProcessContext) {
        super(void.class, List.of(String.class, String.class));
        this.threadProcessContext = threadProcessContext;
    }

    @Override
    protected Object executeAction(List<Object> args) {
        String key = (String) args.get(0);
        String val = (String) args.get(1);

        log.debug("key={}, val={}", key, val);

        threadProcessContext.setVariable(key, val);

        return null;
    }
}
