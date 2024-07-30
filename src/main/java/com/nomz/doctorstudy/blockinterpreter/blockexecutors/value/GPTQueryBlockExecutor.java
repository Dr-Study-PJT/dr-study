package com.nomz.doctorstudy.blockinterpreter.blockexecutors.value;

import com.nomz.doctorstudy.api.ExternalApiCallService;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class GPTQueryBlockExecutor extends BlockExecutor {
    private final ExternalApiCallService externalApiCallService;

    public GPTQueryBlockExecutor(ExternalApiCallService externalApiCallService) {
        super(String.class, List.of(String.class));
        this.externalApiCallService = externalApiCallService;
    }

    @Override
    protected Object executeAction(List<Object> args) {
        String query = (String) args.get(0);

        String answer = externalApiCallService.gpt(query);

        log.debug("\n[GPT]\nquery={}\nanswer={}", query, answer);

        return answer;
    }
}
