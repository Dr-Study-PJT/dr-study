package com.nomz.doctorstudy.blockinterpreter.blockexecutors.command;

import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class LogBlockExecutor extends BlockExecutor {
    public LogBlockExecutor() {
        super(void.class, List.of(String.class));
    }

    @Override
    protected Object executeAction(List<Object> args) {
        log.info("[Block-Log] {}", args.get(0));
        return null;
    }
}
