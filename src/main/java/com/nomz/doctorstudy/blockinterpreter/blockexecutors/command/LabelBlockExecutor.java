package com.nomz.doctorstudy.blockinterpreter.blockexecutors.command;

import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LabelBlockExecutor extends BlockExecutor {
    private final ThreadProcessContext threadProcessContext;

    public LabelBlockExecutor(ThreadProcessContext threadProcessContext) {
        super(void.class, List.of(String.class));
        this.threadProcessContext = threadProcessContext;
    }

    @Override
    protected Object executeAction(List<Object> args) {
        Object arg = args.get(0);

        String name = (String) arg;
        int index = threadProcessContext.get().getCursor();

        threadProcessContext.get().setLabelIndex(name, index);

        return null;
    }
}
