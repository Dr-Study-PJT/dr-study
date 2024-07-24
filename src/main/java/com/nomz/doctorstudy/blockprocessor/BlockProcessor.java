package com.nomz.doctorstudy.blockprocessor;


import com.nomz.doctorstudy.blockprocessor.blocks.Blocks;
import com.nomz.doctorstudy.blockprocessor.blocks.CommandBlock;
import com.nomz.doctorstudy.common.exception.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class BlockProcessor {
    private final Map<Long, List<CommandBlock>> blockListMap;
    private final Map<Long, ProcessContext> processContextMap;

    public BlockProcessor() {
        blockListMap = new HashMap<>();
        processContextMap = new HashMap<>();
    }

    public void init(Long conferenceId, String preprocessedScript) {
        List<CommandBlock> blocks = scriptToBlocks(preprocessedScript);
        blockListMap.put(conferenceId, blocks);
        processContextMap.put(conferenceId, new ProcessContext());
    }

    @Async
    public void run(Long conferenceId) {
        ProcessContext context = processContextMap.get(conferenceId);
        List<CommandBlock> blocks = blockListMap.get(conferenceId);
        for (CommandBlock block : blocks) {
            try {
                block.execute();
            } catch (BusinessException e) {
                // TODO: Idle 예외 추가
                break;
            }
        }
    }

    public void close(Long conferenceId) {
        blockListMap.remove(conferenceId);
        processContextMap.remove(conferenceId);
    }

    private List<CommandBlock> scriptToBlocks(String script) {
        List<CommandBlock> blocks = new ArrayList<>();
        StringTokenizer st = new StringTokenizer(script, ";");
        while (st.hasMoreTokens()) {
            String stmt = st.nextToken();
            blocks.add(Blocks.cmdFromStatement(stmt));
        }
        return blocks;
    }

    private static class ProcessContext {
        public int cursor;

        public ProcessContext() {
            cursor = 0;
        }
    }
}
