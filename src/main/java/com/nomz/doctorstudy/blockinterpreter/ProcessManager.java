package com.nomz.doctorstudy.blockinterpreter;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ProcessManager {
    private final Map<Long, ProcessContext> processContextMap = new ConcurrentHashMap<>();

    public ProcessContext getProcessContext(Long processId) {
        return findProcessContext(processId).orElseThrow(() -> new BlockException(BlockErrorCode.PROCESS_NOT_FOUND));
    }

    public void initProcess(Long processId, List<Block> blockList, Map<String, Object> varMap, Map<String, Integer> labelMap) {
        if (processContextMap.containsKey(processId)) {
            throw new BlockException(BlockErrorCode.PROCESS_ALREADY_EXISTS);
        }
        processContextMap.put(processId, new ProcessContext(processId, blockList, varMap, labelMap));
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
