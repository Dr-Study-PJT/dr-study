package com.nomz.doctorstudy.blockinterpreter;

import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockVariable;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.*;

public class ProcessContext {
    @Getter
    private final long id;
    @Getter
    private int cursor;
    private int commandExecutionCount;
    @Getter @Setter
    private int phase;
    @Getter @Setter
    private ProcessStatus status;
    private int scopeDepth;

    private final List<Block> commandBlocks;
    private final Map<String, Object> initVariableMap;
    private final Map<String, Integer> labelMap;
    private final List<Map<String, Object>> variableMapStack = new ArrayList<>();
    private final List<Transcript> transcripts = new ArrayList<>();

    @Getter
    private final Map<Integer, Map<Integer, String>> programme = new HashMap<>();
    private final List<Long> participantMemberIdList = new ArrayList<>();

    public ProcessContext(long id, List<Block> commandBlocks, Map<String, Object> initVarMap, Map<String, Integer> labelMap) {
        this.id = id;
        this.commandBlocks = commandBlocks;
        this.initVariableMap = new HashMap<>(initVarMap);
        this.labelMap = new HashMap<>(labelMap);
    }

    public void initialize() {
        this.status = ProcessStatus.READY;
        this.cursor = 0;
        this.scopeDepth = 0;

        this.variableMapStack.clear();
        this.variableMapStack.add(new HashMap<>(initVariableMap));

        this.transcripts.clear();
        this.programme.clear();

        this.participantMemberIdList.clear();
        this.participantMemberIdList.add(0L);

        declareVariable(BlockVariable.NUM_OF_PARTICIPANT.getToken());
        setVariable(BlockVariable.NUM_OF_PARTICIPANT.getToken(), 0);
    }

    public void setCursor(int cursor) {
        commandExecutionCount++;
        this.cursor = cursor;
    }

    public void setParticipantVariables(List<Long> memberIds) {
        for (int i=0; i < memberIds.size(); i++) {
            Long memberId = memberIds.get(i);
            participantMemberIdList.add(memberId);

            String variableName = BlockVariable.PARTICIPANT_NAME.getToken() + i;
            declareVariable(variableName);
            setVariable(variableName, "member" + memberId + "'s nickname");
        }
        setVariable(BlockVariable.NUM_OF_PARTICIPANT.getToken(), memberIds.size());
    }

    public void increaseScopeDepth() {
        variableMapStack.add(new HashMap<>());
        ++scopeDepth;
    }

    public void decreaseScopeDepth() {
        variableMapStack.remove(scopeDepth--);
    }

    public void declareVariable(String key) {
        if (variableMapStack.get(scopeDepth).containsKey(key)) {
            throw new BlockException(BlockErrorCode.VARIABLE_ALREADY_DECLARED);
        }
        variableMapStack.get(scopeDepth).put(key, null);
    }
    
    public Object getVariable(String key) {
        for (int i = scopeDepth; i>=0; i--) {
            Object val = variableMapStack.get(i).get(key);
            if (val != null) {
                return val;
            }
        }
        return null;
    }

    public void setVariable(String key, Object val) {
        for (int i = scopeDepth; i>=0; i--) {
            if (variableMapStack.get(i).containsKey(key)) {
                variableMapStack.get(i).replace(key, val);
                return;
            }
        }
        variableMapStack.get(scopeDepth).put(key, val);
    }

    public void addTranscript(String content) {
        transcripts.add(new Transcript(phase, content));
    }

    public String getRecentTranscript(int n) {
        if (n < 1 || n > transcripts.size()) {
            throw new BlockException(BlockErrorCode.TRANSCRIPT_INDEX_OUT_OF_BOUND);
        }
        return transcripts.get(transcripts.size() - n).content;
    }

    public List<String> getPhaseTranscript(int phase) {
        return transcripts.stream()
                .filter(transcript -> transcript.getPhase() == phase)
                .map(Transcript::getContent)
                .toList();
    }

    public int getLabelIndex(String name) {
        return labelMap.get(name);
    }

    public void setLabelIndex(String name, int index) {
        labelMap.put(name, index);
    }

    public boolean isEndOfBlock() {
        return cursor == commandBlocks.size();
    }

    public Block currentBlock() {
        return commandBlocks.get(cursor);
    }

    public void addProgrammeInfo(String info) {
        if (programme.containsKey(phase)) {
            programme.put(phase, new HashMap<>());
        }
        programme.get(phase).put(commandExecutionCount, info);
    }


    @Getter
    @RequiredArgsConstructor
    private static class Transcript {
        private final int phase;
        private final String content;
    }
}
