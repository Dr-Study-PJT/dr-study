package com.nomz.doctorstudy.blockinterpreter.blockexecutors.value;

import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class GetNumOfParticipantBlockExecutor extends BlockExecutor {
    private final ThreadProcessContext threadProcessContext;
    public GetNumOfParticipantBlockExecutor(ThreadProcessContext threadProcessContext) {
        super(Integer.class, List.of());
        this.threadProcessContext = threadProcessContext;
    }

    @Override
    protected Object executeAction(List<Object> args) {
        int numOfParticipant = (int) threadProcessContext.getVariable("num_of_participant");

        log.debug("num_of_participant = {}", numOfParticipant);

        return numOfParticipant;
    }
}
