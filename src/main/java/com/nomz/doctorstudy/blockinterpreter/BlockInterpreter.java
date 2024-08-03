package com.nomz.doctorstudy.blockinterpreter;

import com.nomz.doctorstudy.blockinterpreter.blockexecutors.*;
import com.nomz.doctorstudy.common.exception.BusinessException;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class BlockInterpreter {
    private final ProcessManager processManager;
    private final ThreadProcessContext threadProcessContext;
    private final BlockFactory blockFactory;
    private final BlockExecutorMapper blockExecutorMapper;

    public void init(Long processContextId, String preprocessedScript, Map<String, Object> varMap) {
        Map<String, Integer> labelMap = new HashMap<>();
        List<Block> blocks = tokenizeScript(preprocessedScript, labelMap);
        processManager.initProcess(processContextId, blocks, varMap, labelMap);
    }

    @Async
    public void interpret(Long processContextId) {
        interpret(processContextId, ProcessMode.RUN);
    }

    @Async
    public void interpret(Long processContextId, ProcessMode processMode) {
        log.info("processContextId={} started to run", processContextId);

        ProcessContext processContext = processManager.getProcessContext(processContextId);
        threadProcessContext.init(processContext);

        while (!threadProcessContext.isEndOfBlock()) {
            Block commandBlock = threadProcessContext.currentBlock();
            Stack<BlockInterpretContext> stack = new Stack<>();
            stack.push(new BlockInterpretContext(commandBlock, new ArrayList<>(), 0));
            String methodForDebug = commandBlock.getMethod();
            log.debug("cursor={}, block={}", processContext.getCursor(), commandBlock.getMethod());

            while (!stack.empty()) {
                BlockExecutor blockExecutor = blockExecutorMapper.getBlockExecutor(stack.peek().block.getMethod());

                if (blockExecutor == null) {
                    String value = stack.peek().block.getMethod();

                    Object result = null;

                    if (value.startsWith("'") && value.endsWith("'")) {
                        result = value.substring(1, value.length() - 1);
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
                    Block argBlock = stack.peek().block.getArgBlocks().get(stack.peek().argCursor);
                    stack.push(new BlockInterpretContext(argBlock, new ArrayList<>(), 0));
                    continue;
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

            threadProcessContext.increaseCursor();
        }

        if (processMode == ProcessMode.PROGRAMME) {
            log.info("Block Script Programme\n{}", threadProcessContext.getProgramme());
        }

        threadProcessContext.close();

        log.info("processContextId={} ended to run", processContextId);
    }

    public void close(Long processContextId) {
        processManager.removeProcess(processContextId);
    }

    @AllArgsConstructor
    private static class BlockInterpretContext {
        private final Block block;
        private final List<Object> args;
        public int argCursor;
    }

    private List<Block> tokenizeScript(String script, Map<String, Integer> labelMap) {
        List<Block> blocks = new ArrayList<>();
        StringTokenizer st = new StringTokenizer(script, ";");
        while (st.hasMoreTokens()) {
            String stmt = st.nextToken();
            Block parsedBlock = blockFactory.parseStatement(stmt);
            if (parsedBlock.getArgBlocks().size() == 1 && parsedBlock.getArgBlocks().get(0).getMethod().isEmpty()) {
                parsedBlock.getArgBlocks().clear();
            }
            blocks.add(parsedBlock);
            if (parsedBlock.getMethod().equals(BlockType.LABEL.getToken())) {
                String labelName = parsedBlock.getArgBlocks().get(0).getMethod();
                labelName = labelName.substring(1, labelName.length() - 1);
                int labelIndex = blocks.size() - 1;
                labelMap.put(labelName, labelIndex);
                log.debug("added label[name={}, index={}]", labelName, labelIndex);
            }
        }
        return blocks;
    }
}
