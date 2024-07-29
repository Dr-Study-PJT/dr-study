package com.nomz.doctorstudy.blockinterpreter;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ProcessContextManager {
    private final Map<Long, ProcessContext> processContextMap = new ConcurrentHashMap<>();

    public ProcessContext getProcessContext(Long id) {
        return processContextMap.get(id);
    }

    public void add(Long processContextId, List<Block> blockList, Map<String, Object> varMap, Map<String, Integer> labelMap) {
        processContextMap.put(processContextId, new ProcessContext(blockList, varMap, labelMap));
    }

    public void remove(Long processContextId) {
        processContextMap.remove(processContextId);
    }
}
