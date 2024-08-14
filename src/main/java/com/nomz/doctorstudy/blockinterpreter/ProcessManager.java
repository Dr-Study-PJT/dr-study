package com.nomz.doctorstudy.blockinterpreter;

import com.nomz.doctorstudy.conference.room.RoomParticipantInfo;
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

    public void createProcess(Long processId, List<Block> blockList, Map<String, Object> varMap, Map<String, Integer> labelMap, ConferenceContext conferenceContext) {
        ProcessContext processContext = processContextMap.get(processId);

        if (processContext != null && processContext.getStatus() == ProcessStatus.RUNNING) {
            log.warn("Enabled force restart for debugging");
            //throw new BlockException(BlockErrorCode.PROCESS_ALREADY_RUNNING);
        }

        if (processContext != null && processContext.getStatus() == ProcessStatus.NORMAL_RUN_FINISH) {
            log.warn("Enabled restart for debugging");
            processContextMap.remove(processId);
        }

        processContext = new ProcessContext(processId, blockList, varMap, labelMap, conferenceContext);
        processContext.initialize();
        processContextMap.put(processId, processContext);
    }

    public void removeProcess(Long processId) {
        if (!processContextMap.containsKey(processId)) {
            log.warn("Tried to remove process:{}, but couldn't found process:{}", processId, processId);
            // throw new BlockException(BlockErrorCode.PROCESS_NOT_FOUND);
        }
        processContextMap.remove(processId);
    }

    private Optional<ProcessContext> findProcessContext(Long processId) {
        return Optional.ofNullable(processContextMap.get(processId));
    }
}
