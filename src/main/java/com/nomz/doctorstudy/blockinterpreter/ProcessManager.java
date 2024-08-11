package com.nomz.doctorstudy.blockinterpreter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
public class ProcessManager {
    private final Map<Long, ProcessContext> processContextMap = new ConcurrentHashMap<>();

    public ProcessContext getProcessContext(Long processId) {
        return findProcessContext(processId).orElseThrow(() -> new BlockException(BlockErrorCode.PROCESS_NOT_FOUND));
    }

    public void createProcess(Long processId, List<Block> blockList, Map<String, Object> varMap, Map<String, Integer> labelMap) {
        ProcessContext processContext = processContextMap.get(processId);

        if (processContext != null && processContext.getStatus() == ProcessStatus.RUNNING) {
            throw new BlockException(BlockErrorCode.PROCESS_ALREADY_RUNNING);
        }

        if (processContext != null && processContext.getStatus() == ProcessStatus.NORMAL_RUN_FINISH) {
            log.warn("디버깅을 위해 다시 시작할 수 있도록 되어있습니다. 문제가 해결되면 재시작 불가능하도록 수정해주세요.");
            processContextMap.remove(processId);
        }

        processContext = new ProcessContext(processId, blockList, varMap, labelMap);
        processContext.initialize();
        processContextMap.put(processId, processContext);
    }

    public void removeProcess(Long processId) {
        if (!processContextMap.containsKey(processId)) {
            throw new BlockException(BlockErrorCode.PROCESS_NOT_FOUND);
        }
        processContextMap.remove(processId);
    }

    private Optional<ProcessContext> findProcessContext(Long processId) {
        return Optional.ofNullable(processContextMap.get(processId));
    }
}
