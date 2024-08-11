package com.nomz.doctorstudy.blockinterpreter.blockexecutors.value;

import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class GetParticipantNameBlockExecutor extends BlockExecutor {
    private final ThreadProcessContext threadProcessContext;
    public GetParticipantNameBlockExecutor(ThreadProcessContext threadProcessContext) {
        super(String.class, List.of(Integer.class));
        this.threadProcessContext = threadProcessContext;
    }

    @Override
    protected Object executeAction(List<Object> args) {
        int participantNum = (int) args.get(0);
        String participantName = (String) threadProcessContext.get().getVariable("participant_name_" + participantNum);

        log.debug("name of participant {} is {}", participantNum, participantName);

        return participantName;
    }
}
