package com.nomz.doctorstudy.blockinterpreter.blockexecutors.value;

import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class IntToStringBlockExecutor extends BlockExecutor {
    public IntToStringBlockExecutor() {
        super(String.class, List.of(Integer.class));
    }

    @Override
    protected Object executeAction(List<Object> args) {
        Object arg = args.get(0);
        String result = String.valueOf(arg);

        log.debug("converted int to string: {} => {}", result, "'" + result + "'");

        return result;
    }
}
