package com.nomz.doctorstudy.blockinterpreter.blockexecutors.value;

import com.nomz.doctorstudy.api.ExternalApiCallService;
import com.nomz.doctorstudy.blockinterpreter.ProcessContext;
import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class GptQueryBlockExecutor extends BlockExecutor {
    private final ExternalApiCallService externalApiCallService;
    private final ThreadProcessContext threadProcessContext;

    public GptQueryBlockExecutor(ExternalApiCallService externalApiCallService, ThreadProcessContext threadProcessContext) {
        super(String.class, List.of(String.class));
        this.externalApiCallService = externalApiCallService;
        this.threadProcessContext = threadProcessContext;
    }

    @Override
    protected Object executeAction(List<Object> args) {
        String query = (String) args.get(0);

        String gptHistory = threadProcessContext.get().getGptContext().getHistory();
        String prePrompt = threadProcessContext.get().getGptContext().getPrePrompt();

        StringBuilder queryBuilder = new StringBuilder();
        queryBuilder.append("[History Start]").append(gptHistory).append("[History End]");
        queryBuilder.append("[PrePrompt Start]").append(prePrompt).append("[PrePrompt End]");

        String answer = externalApiCallService.gpt(queryBuilder.toString());
        threadProcessContext.get().addGptHistory(query, answer);

        log.debug("[GPT]query={}answer={}", queryBuilder.toString(), answer);

        return answer;
    }

    @Override
    public Object executeGetProgramme(List<Object> args) {
        return "GPT PROGRAMME";
    }
}
