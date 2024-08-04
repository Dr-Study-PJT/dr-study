package com.nomz.doctorstudy.blockinterpreter;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.*;

public class ProcessContext {
    @Getter
    private final long id;
    @Getter @Setter
    private int cursor;
    @Getter @Setter
    private int phase;
    private final List<Block> commandBlocks;
    private int scopeDepth;
    private final List<Map<String, Object>> variableMapStack;
    private final Map<String, Integer> labelMap;
    private final List<Transcript> transcripts;
    @Getter
    private final List<String> programme;

    public ProcessContext(long id, List<Block> commandBlocks, Map<String, Object> varMap, Map<String, Integer> labelMap) {
        this.id = id;
        this.commandBlocks = commandBlocks;
        this.cursor = 0;
        this.scopeDepth = 0;
        this.variableMapStack = new ArrayList<>();
        this.variableMapStack.add(new HashMap<>(varMap)); // TODO: deepCopy 필요 여부 확인하기
        this.labelMap = new HashMap<>(labelMap);
        this.transcripts = new ArrayList<>();
        this.programme = new ArrayList<>();
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
            throw new RuntimeException("이미 키 가지고 있음"); //TODO: 예외 추상화 필요
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
        programme.add(info);
    }


    @Getter
    @RequiredArgsConstructor
    private static class Transcript {
        private final int phase;
        private final String content;
    }
}
