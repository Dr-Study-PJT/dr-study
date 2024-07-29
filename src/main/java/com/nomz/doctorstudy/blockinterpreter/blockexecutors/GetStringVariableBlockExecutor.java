package com.nomz.doctorstudy.blockinterpreter.blockexecutors;

import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class GetStringVariableBlockExecutor extends BlockExecutor {
    private final ThreadProcessContext threadProcessContext;

    public GetStringVariableBlockExecutor(ThreadProcessContext threadProcessContext) {
        super(Object.class, List.of(String.class));
        this.threadProcessContext = threadProcessContext;
    }

    @Override
    protected Object executeAction(List<Object> args) {
        String key = (String) args.get(0);
        String val = (String) threadProcessContext.getVariable(key);

        log.debug("key={}, val={}", key, val);

        return threadProcessContext.getVariable(key);
    }
}
