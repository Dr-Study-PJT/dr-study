package com.nomz.doctorstudy.blockinterpreter.blockexecutors.value;

import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class GetIntVariableBlockExecutor extends BlockExecutor {
    private final ThreadProcessContext threadProcessContext;

    public GetIntVariableBlockExecutor(ThreadProcessContext threadProcessContext) {
        super(Integer.class, List.of(String.class));
        this.threadProcessContext = threadProcessContext;
    }

    @Override
    protected Object executeAction(List<Object> args) {
        String key = (String) args.get(0);
        Integer val = (Integer) threadProcessContext.getVariable(key);

        log.debug("key={}, val={}", key, val);

        return val;
    }
}
