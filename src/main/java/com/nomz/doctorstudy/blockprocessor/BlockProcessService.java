package com.nomz.doctorstudy.blockprocessor;

import com.nomz.doctorstudy.blockprocessor.script.ScriptPreprocessor;
import com.nomz.doctorstudy.blockprocessor.blocks.BlockProcessor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class BlockProcessService {
    private Map<Long, BlockProcessor> processorMap = new HashMap<>();
    private final ScriptPreprocessor scriptPreprocessor;

    public void startBlockProcessor(Long id, String script, Map<String, Object> varMap) {
        String preprocessedScript = scriptPreprocessor.preprocessScript(script,varMap);
        BlockProcessor blockProcessor = new BlockProcessor(preprocessedScript);
        processorMap.put(id, blockProcessor);
    }
}
