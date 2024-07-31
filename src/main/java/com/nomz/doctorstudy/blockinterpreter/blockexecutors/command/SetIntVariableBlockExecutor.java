package com.nomz.doctorstudy.blockinterpreter.blockexecutors.command;

import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class SetIntVariableBlockExecutor extends BlockExecutor {
    private final ThreadProcessContext threadProcessContext;

    public SetIntVariableBlockExecutor(ThreadProcessContext threadProcessContext) {
        super(void.class, List.of(String.class, Integer.class));
        this.threadProcessContext = threadProcessContext;
    }

    @Override
    protected Object executeAction(List<Object> args) {
        String key = (String) args.get(0);
        Integer val = (Integer) args.get(1);

        log.debug("key={}, val={}", key, val);

        threadProcessContext.setVariable(key, val);

        return null;
    }
}
