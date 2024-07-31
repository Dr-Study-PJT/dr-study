package com.nomz.doctorstudy.blockinterpreter.blockexecutors.command;

import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class WaitBlockExecutor extends BlockExecutor {
    public WaitBlockExecutor() {
        super(void.class, List.of(Integer.class));
    }

    @Override
    public Object executeAction(List<Object> args) {
        Object arg = args.get(0);
        long time = Integer.parseInt(String.valueOf(arg));
        try {
            Thread.sleep(time * 1000);
        } catch (InterruptedException e) {
            throw new RuntimeException("Interrupted during sleep", e);
        }

        return null;
    }
}
