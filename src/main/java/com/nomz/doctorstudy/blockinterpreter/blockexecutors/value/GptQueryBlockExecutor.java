package com.nomz.doctorstudy.blockinterpreter.blockexecutors.value;

import com.nomz.doctorstudy.api.ExternalApiCallService;
import com.nomz.doctorstudy.blockinterpreter.ProcessContext;
import com.nomz.doctorstudy.blockinterpreter.ThreadProcessContext;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockExecutor;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockVariable;
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

        ProcessContext processContext = threadProcessContext.get();

        String gptHistory = processContext.getGptContext().getHistory();
        String prePrompt = processContext.getConferenceContext().getPrePrompt();
        String subject = processContext.getConferenceContext().getSubject();

        StringBuilder contextBuilder = new StringBuilder();
        int numOfParticipant = processContext.getNumOfParticipant();
        for (int i=1; i<=numOfParticipant; i++) {
            String participantName = processContext.getParticipantName(i);
            contextBuilder.append("<").append(i).append("번 참여자=").append(participantName).append(">");
        }
        contextBuilder.append("<").append("주제=").append(subject).append(">");
        int phase = (int) processContext.getVariable(BlockVariable.CURRENT_PHASE.getToken());
        contextBuilder.append("<").append("페이즈(단계)=").append(processContext).append(phase);

        StringBuilder queryBuilder = new StringBuilder();
        queryBuilder.append("[PrePrompt Start]").append(prePrompt).append("[PrePrompt End]");
        queryBuilder.append("[Gpt Query History Start]").append(gptHistory).append("[Gpt Query History End]");
        queryBuilder.append("[Context Start]").append(contextBuilder).append("[Context End]");
        queryBuilder.append("[Current Query Start]").append(query).append("[Current Query End]");

        String answer = externalApiCallService.gpt(queryBuilder.toString());
        processContext.addGptHistory(query, answer);

        log.debug("[GPT]\n[Query]\n{}\n[Answer]\n{}", queryBuilder, answer);

        return answer;
    }

    @Override
    public Object executeGetProgramme(List<Object> args) {
        return "GPT PROGRAMME";
    }
}
