package com.nomz.doctorstudy.blockinterpreter.blockexecutors.value;

import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockVariable;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class GetNumOfIterationBlockExecutor extends BlockExecutor {
    private final ThreadProcessContext threadProcessContext;

    public GetNumOfIterationBlockExecutor(ThreadProcessContext threadProcessContext) {
        super(Integer.class, List.of());
        this.threadProcessContext = threadProcessContext;
    }

    @Override
    protected Object executeAction(List<Object> args) {
        String iterVarName = (String) threadProcessContext.get().getVariable(BlockVariable.CURRENT_ITERATOR.getToken());
        Integer numOfIteration = (Integer) threadProcessContext.get().getVariable(iterVarName);

        log.debug("current_iter={}, num_of_iteration={}", iterVarName, numOfIteration);

        return numOfIteration;
    }
}
