package com.nomz.doctorstudy.blockinterpreter.blockexecutors;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StringConcatBlockExecutor extends BlockExecutor {
    public StringConcatBlockExecutor() {
        super(String.class, List.of(String.class));
    }

    @Override
    public boolean validateArgs(List<Object> args) {
        if (args.isEmpty()) {
            return false;
        }
        for (Object arg : args) {
            if (arg.getClass() != parameterTypes.get(0)) {
                return false;
            }
        }
        return true;
    }

    @Override
    protected Object executeAction(List<Object> args) {
        StringBuilder sb = new StringBuilder();
        for (Object arg : args) {
            sb.append(arg);
        }
        return sb.toString();
    }
}
