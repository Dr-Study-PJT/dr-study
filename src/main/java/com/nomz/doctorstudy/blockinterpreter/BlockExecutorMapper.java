package com.nomz.doctorstudy.blockinterpreter;

import com.nomz.doctorstudy.blockinterpreter.blockexecutors.*;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.command.*;
import com.nomz.doctorstudy.blockinterpreter.blockexecutors.value.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class BlockExecutorMapper {
    // Command Blocks
    private final WaitBlockExecutor waitBlockExecutor;
    private final LogBlockExecutor logBlockExecutor;
    private final SetIntVariableBlockExecutor setIntVariableBlockExecutor;
    private final SetStringVariableBlockExecutor setStringVariableBlockExecutor;
    private final LabelBlockExecutor labelBlockExecutor;
    private final JumpBlockExecutor jumpBlockExecutor;
    private final IncreaseDepthBlockExecutor increaseDepthBlockExecutor;
    private final DecreaseDepthBlockExecutor decreaseDepthBlockExecutor;
    private final DeclareVariableBlockExecutor declareVariableBlockExecutor;
    private final LetAvatarSpeakBlockExecutor letAvatarSpeakBlockExecutor;
    private final LetParticipantSpeakBlockExecutor letParticipantSpeakBlockExecutor;

    // Value Blocks
    private final StringConcatBlockExecutor stringConcatBlockExecutor;
    private final GetIntVariableBlockExecutor getIntVariableBlockExecutor;
    private final GetStringVariableBlockExecutor getStringVariableBlockExecutor;
    private final IntToStringBlockExecutor intToStringBlockExecutor;
    private final CalculateBlockExecutor calculateBlockExecutor;
    private final CompareIntBlockExecutor compareIntBlockExecutor;
    private final BooleanToStringBlockExecutor booleanToStringBlockExecutor;
    private final GPTQueryBlockExecutor gptQueryBlockExecutor;

    private final Map<String, BlockExecutor> map = new ConcurrentHashMap<>();

    @PostConstruct
    private void initMap() {
        // Command Blocks
        map.put(BlockType.WAIT.getToken(), waitBlockExecutor);
        map.put(BlockType.SET_INT_VAR.getToken(), setIntVariableBlockExecutor);
        map.put(BlockType.SET_STRING_VAR.getToken(), setStringVariableBlockExecutor);
        map.put(BlockType.LOG.getToken(), logBlockExecutor);
        map.put(BlockType.LABEL.getToken(), labelBlockExecutor);
        map.put(BlockType.JUMP.getToken(), jumpBlockExecutor);
        map.put(BlockType.DECREASE_DEPTH.getToken(), decreaseDepthBlockExecutor);
        map.put(BlockType.INCREASE_DEPTH.getToken(), increaseDepthBlockExecutor);
        map.put(BlockType.DECLARE_VAR.getToken(), declareVariableBlockExecutor);
        map.put(BlockType.LET_AVATAR_SPEAK.getToken(), letAvatarSpeakBlockExecutor);
        map.put(BlockType.LET_PARTICIPANT_SPEAK.getToken(), letParticipantSpeakBlockExecutor);

        // Value Blocks
        map.put(BlockType.STRING_CONCAT.getToken(), stringConcatBlockExecutor);
        map.put(BlockType.GET_INT_VAR.getToken(), getIntVariableBlockExecutor);
        map.put(BlockType.GET_STRING_VAR.getToken(), getStringVariableBlockExecutor);
        map.put(BlockType.INT_TO_STRING.getToken(), intToStringBlockExecutor);
        map.put(BlockType.CALCULATE.getToken(), calculateBlockExecutor);
        map.put(BlockType.COMPARE_INT.getToken(), compareIntBlockExecutor);
        map.put(BlockType.BOOLEAN_TO_STRING.getToken(), booleanToStringBlockExecutor);
        map.put(BlockType.GPT_QUERY.getToken(), gptQueryBlockExecutor);
    }

    public BlockExecutor getBlockExecutor(String method) {
        return map.get(method);
    }
}
