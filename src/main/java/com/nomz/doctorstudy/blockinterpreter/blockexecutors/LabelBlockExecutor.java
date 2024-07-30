package com.nomz.doctorstudy.blockinterpreter.blockexecutors;

import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
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
        int index = threadProcessContext.getCursor();

        threadProcessContext.setLabelIndex(name, index);

        return null;
    }
}
