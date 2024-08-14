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
        String prefix = """
        밑의 내용을 보기 전에 너가 숙지해야할 사항이 있어.
        너는 앞으로 대답할 때, <My New Query>의 내용에 대한 답변을 해야해.
        그 외의 내용은 모두 대답을 하기 위한 참고사항일 뿐이야.
        """;
        String suffix = """
        다시 한번 말한다.
        너는 <My New Query>의 내용에 대한 답변을 해야해.
        그 외의 내용은 단지 대답을 하기 위한 참고사항일 뿐이야.
        """;
        String prePrompt = processContext.getConferenceContext().getPrePrompt();
        String subject = processContext.getConferenceContext().getSubject();
        int phase = (int) processContext.getVariable(BlockVariable.CURRENT_PHASE.getToken());
        int numOfParticipant = processContext.getNumOfParticipant();

        StringBuilder contextBuilder = new StringBuilder();
        contextBuilder.append(String.format("\t<이번 스터디 내 총 참여자 수=%d/>\n", numOfParticipant));
        for (int i=1; i<=numOfParticipant; i++) {
            String participantName = processContext.getParticipantName(i);
            contextBuilder.append(String.format("\t<%d번 참여자의 이름=%s/>\n", i, participantName));
        }
        contextBuilder.append(String.format("\t<주제=%s/>\n", subject));
        contextBuilder.append(String.format("\t<현재 단계=%d/>", phase));

        StringBuilder queryBuilder = new StringBuilder();
        //queryBuilder.append(prefix).append('\n');
        queryBuilder.append("----- 이 정보들은 이번 스터디의 사회를 진행하기 위해 너가 사전에 숙지해야 할 정보들이야. -----\n");
        queryBuilder.append(String.format("<My Query & Gpt Answer History>\n%s\n<My Query & Gpt Answer History/>\n\n", gptHistory));
        queryBuilder.append(String.format("<PrePrompt>\n%s\n<PrePrompt/>\n\n", prePrompt));
        queryBuilder.append(String.format("<Context>\n%s\n<Context/>\n\n", contextBuilder));
        queryBuilder.append("----- 지금까지가 이번 스터디의 사회를 진행하기 위해 숙지해야 하는 정보들이야. -----\n\n\n");
        queryBuilder.append(String.format("<My New Query>\n%s\n<My New Query/>\n\n", query));
        //queryBuilder.append(suffix).append('\n');

        String gptResponse = externalApiCallService.gpt(queryBuilder.toString());

        processContext.addGptHistory(query, gptResponse);

        log.debug("\n-----<Gpt Block Executor Log>-----\n[Send to GPT]\n{}\n[Received from GPT]\n{}\n", queryBuilder, gptResponse);


        return gptResponse;
    }

    @Override
    public Object executeGetProgramme(List<Object> args) {
        return "GPT PROGRAMME";
    }
}
