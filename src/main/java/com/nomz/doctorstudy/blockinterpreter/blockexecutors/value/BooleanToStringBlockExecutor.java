package com.nomz.doctorstudy.blockinterpreter.blockexecutors.value;

import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class BooleanToStringBlockExecutor extends BlockExecutor {
    public BooleanToStringBlockExecutor() {
        super(String.class, List.of(Boolean.class));
    }

    @Override
    protected Object executeAction(List<Object> args) {
        Object arg = args.get(0);
        String result = String.valueOf(arg);

        log.debug("converted boolean to string: {} => {}", result, "'" + result + "'");

        return result;
    }
}
