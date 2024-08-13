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
        int phase = (int) processContext.getVariable(BlockVariable.CURRENT_PHASE.getToken());
        int numOfParticipant = processContext.getNumOfParticipant();

        StringBuilder contextBuilder = new StringBuilder();
        contextBuilder.append("<").append("이번 스터디 내 총 참여자 수=").append(numOfParticipant).append(">\n");
        for (int i=1; i<=numOfParticipant; i++) {
            String participantName = processContext.getParticipantName(i);
            contextBuilder.append("<").append(i).append("번 참여자=").append(participantName).append(">\n");
        }
        contextBuilder.append("<").append("주제=").append(subject).append(">\n");
        contextBuilder.append("<").append("현재 페이즈=").append(phase).append(">\n");
        contextBuilder.append("-----\n");

        StringBuilder queryBuilder = new StringBuilder("----- 이 정보들은 이번 스터디의 사회를 진행하기 위해 너가 사전에 숙지해야 할 정보들이야. -----\n");
        queryBuilder.append("[Gpt Query History Start]\n").append(gptHistory).append("\n[Gpt Query History End]\n");
        queryBuilder.append("[PrePrompt Start]\n").append(prePrompt).append("\n[PrePrompt End]\n");
        queryBuilder.append("[Context Start]\n").append(contextBuilder).append("\n[Context End]\n");
        queryBuilder.append("----- 지금까지가 이번 스터디의 사회를 진행하기 위해 숙지해야 하는 정보들이야. 다음은 너가 답변해야 하는 질문이야 -----\n");
        queryBuilder.append("[Current Query Start]\n").append(query).append("\n[Current Query End]\n");

        String answer = externalApiCallService.gpt(queryBuilder.toString());
        processContext.addGptHistory(query, answer);

        log.debug("[GPT]\n[Query]\n{}\n\n[Answer]\n{}\n", queryBuilder, answer);

        return answer;
    }

    @Override
    public Object executeGetProgramme(List<Object> args) {
        return "GPT PROGRAMME";
    }
}
