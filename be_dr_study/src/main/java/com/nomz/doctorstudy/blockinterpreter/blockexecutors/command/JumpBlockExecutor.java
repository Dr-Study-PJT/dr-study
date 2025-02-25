package com.nomz.doctorstudy.blockinterpreter.blockexecutors.command;

import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class JumpBlockExecutor extends BlockExecutor {
    private final ThreadProcessContext threadProcessContext;
    public JumpBlockExecutor(ThreadProcessContext threadProcessContext) {
        super(void.class, List.of(Boolean.class, String.class));
        this.threadProcessContext = threadProcessContext;
    }

    @Override
    protected Object executeAction(List<Object> args) {
        boolean condition = (boolean) args.get(0);
        String labelName = (String) args.get(1);

        if (!condition) {
            log.debug("jump condition is 0");
            return null;
        }

        int labelIndex = threadProcessContext.get().getLabelIndex(labelName);

        log.debug("jump from {} to {}", threadProcessContext.get().getCursor(), labelIndex);

        threadProcessContext.get().setCursor(labelIndex);

        return null;
    }
}
