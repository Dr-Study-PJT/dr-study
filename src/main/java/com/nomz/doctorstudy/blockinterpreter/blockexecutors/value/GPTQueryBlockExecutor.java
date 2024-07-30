package com.nomz.doctorstudy.blockinterpreter.blockexecutors.value;

import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class GPTQueryBlockExecutor extends BlockExecutor {
    public GPTQueryBlockExecutor() {
        super(String.class, List.of(String.class));
    }

    @Override
    protected Object executeAction(List<Object> args) {
        log.debug("GPT query!");

        return "GPT's Answer";
    }
}
