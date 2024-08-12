package com.nomz.doctorstudy.blockinterpreter;

import com.nomz.doctorstudy.blockinterpreter.blockexecutors.*;
import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.conference.room.RoomParticipantInfo;
import com.nomz.doctorstudy.conference.room.SignalTransmitter;
import com.nomz.doctorstudy.conference.room.signal.ProgrammeSignal;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class BlockInterpreter {
    private final ProcessManager processManager;
    private final ThreadProcessContext threadProcessContext;
    private final BlockExecutorMapper blockExecutorMapper;
    private final ScriptPreprocessor scriptPreprocessor;
    private final SignalTransmitter signalTransmitter;

    public void init(Long processId, String script, Map<String, Object> varMap, ConferenceContext conferenceContext) {
        List<Block> blocks = scriptPreprocessor.preprocessScript(script);
        Map<String, Integer> labelMap = parseLabels(blocks);
        processManager.createProcess(processId, blocks, varMap, labelMap, conferenceContext);
    }

    public void interpret(Long processId) {
        interpret(processId, ProcessMode.NORMAL);
    }

    public void interpret(Long processId, ProcessMode processMode) {
        log.info("processId={} started to run", processId);

        ProcessContext processContext = processManager.getProcessContext(processId);
        threadProcessContext.setProcessContext(processContext);
        processContext.setStatus(ProcessStatus.RUNNING);

        while (!processContext.isEndOfBlock()) {
            Block commandBlock = processContext.currentBlock();
            Stack<InterpreterContext> stack = new Stack<>();
            stack.push(new InterpreterContext(commandBlock, new ArrayList<>(), 0));
            String methodForDebug = commandBlock.getMethod();
            log.debug("method={}", commandBlock.getMethod());
            log.debug("cursor={}, block={}", processContext.getCursor(), commandBlock.getMethod());

            while (!stack.empty()) {
                BlockExecutor blockExecutor = blockExecutorMapper.getBlockExecutor(stack.peek().block.getMethod());

                if (blockExecutor == null) {
                    String value = stack.peek().block.getMethod();

                    Object result = null;

                    if (value.startsWith("'") && value.endsWith("'")) {
                        result = getEscapeProcessedString(value);
                    }
                    if (StringUtils.isNumeric(value)) {
                        result = Integer.parseInt(value);
                    }
                    if (value.equals("true")) {
                        result = true;
                    }
                    if (value.equals("false")) {
                        result = false;
                    }
                    if (result == null) {
                        throw new BusinessException(BlockErrorCode.UNEXPECTED_TOKEN);
                    }

                    stack.pop();
                    stack.peek().args.add(result);
                    stack.peek().argCursor++;
                    continue;
                }

                if (stack.peek().argCursor < stack.peek().block.getArgBlocks().size()) {
                    if (!(stack.peek().argCursor == 0 && stack.peek().block.getArgBlocks().get(0).getMethod().isEmpty())) {
                        Block argBlock = stack.peek().block.getArgBlocks().get(stack.peek().argCursor);
                        stack.push(new InterpreterContext(argBlock, new ArrayList<>(), 0));
                        continue;
                    }
                }

                Object result = blockExecutor.execute(stack.peek().args, processMode);

                if (result == null || stack.size() == 1) {
                    if (result != null) {
                        throw new BlockException(BlockErrorCode.COMMAND_BLOCK_NOT_FOUND, processContext.getCursor());
                    }
                    if (stack.size() > 1) {
                        throw new BlockException(BlockErrorCode.VALUE_BLOCK_NOT_FOUND, processContext.getCursor());
                    }
                    break;
                }
                stack.pop();
                stack.peek().args.add(result);
                stack.peek().argCursor++;
            }

            processContext.increaseCursor();
        }

        if (processMode == ProcessMode.PROGRAMME) {
            log.info("Block Script Programme\n{}", processContext.getProgramme());
            signalTransmitter.transmitSignal(processId, new ProgrammeSignal(processContext.getProgramme()));
            processContext.setStatus(ProcessStatus.PROGRAMME_RUN_FINISH);
        }
        else {
            processContext.setStatus(ProcessStatus.NORMAL_RUN_FINISH);
        }

        threadProcessContext.removeProcessContext();

        log.info("processId={} ended to run", processId);
    }

    private String getEscapeProcessedString(String value) {
        StringBuilder sb = new StringBuilder();
        String strVal = value.substring(1, value.length() - 1);
        boolean escapeFlag = false;

        for (char ch : strVal.toCharArray()) {
            if (escapeFlag) {
                escapeFlag = false;
                if (ch == 'n') {
                    sb.append('\n');
                    continue;
                }
                if (ch == 't') {
                    sb.append('\t');
                    continue;
                }
                sb.append(ch);
                continue;
            }
            if (ch == '\\') {
                escapeFlag = true;
                continue;
            }
            sb.append(ch);
        }

        return sb.toString();
    }

    private Map<String, Integer> parseLabels(List<Block> blocks) {
        Map<String, Integer> labelMap = new HashMap<>();

        for (int i=0; i<blocks.size(); i++) {
            Block block = blocks.get(i);
            if (block.getMethod().equals(BlockType.LABEL.getToken())) {
                String labelNameArg = block.getArgBlocks().get(0).getMethod();
                String labelName = labelNameArg.substring(1, labelNameArg.length() - 1);

                labelMap.put(labelName, i);

                log.debug("added label[name={}, index={}]", labelName, i);
            }
        }

        return labelMap;
    }

    @AllArgsConstructor
    private static class InterpreterContext {
        private final Block block;
        private final List<Object> args;
        public int argCursor;
    }
}
