package com.nomz.doctorstudy.blockinterpreter.blockexecutors.value;

import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class GetRecordsInPhaseBlockExecutor extends BlockExecutor {
    private final ThreadProcessContext threadProcessContext;

    public GetRecordsInPhaseBlockExecutor(ThreadProcessContext threadProcessContext) {
        super(String.class, List.of(Integer.class));
        this.threadProcessContext = threadProcessContext;
    }

    @Override
    protected Object executeAction(List<Object> args) {
        int phase = (int) args.get(0);

        List<String> phaseTranscript = threadProcessContext.get().getPhaseTranscript(phase);

        log.debug("Phase {} transcript={}", phase, phaseTranscript.toString());

        return phaseTranscript;
    }

    @Override
    public Object executeGetProgramme(List<Object> args) {
        return "Get Records In Phase Block";
    }
}
