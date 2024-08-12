package com.nomz.doctorstudy.blockinterpreter.blockexecutors.command;

import com.nomz.doctorstudy.blockinterpreter.ProcessLockManager;
import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
public class WaitBlockExecutor extends BlockExecutor {
    private final ThreadProcessContext threadProcessContext;

    public WaitBlockExecutor(ThreadProcessContext threadProcessContext) {
        super(void.class, List.of(Integer.class));
        this.threadProcessContext = threadProcessContext;
    }

    @Override
    public Object executeAction(List<Object> args) {
        Object arg = args.get(0);
        int time = Integer.parseInt(String.valueOf(arg));

        long processId = threadProcessContext.get().getId();

        ProcessLockManager.sleep(processId, time);

        return null;
    }

    @Override
    public Object executeGetProgramme(List<Object> args) {
        return null;
    }
}
