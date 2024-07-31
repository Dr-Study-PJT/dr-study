package com.nomz.doctorstudy.blockinterpreter;

import lombok.Getter;

import java.util.*;

public class ProcessContext {
    private final List<Block> commandBlocks;
    public int cursor;
    private int scopeDepth;
    private final List<Map<String, Object>> variableMapStack;
    private final Map<String, Integer> labelMap;
    private final Map<String, String> transcriptionMap;

    @Getter
    private final List<String> programme;

    public ProcessContext(List<Block> commandBlocks, Map<String, Object> varMap, Map<String, Integer> labelMap) {
        this.commandBlocks = commandBlocks;
        this.cursor = 0;
        this.scopeDepth = 0;
        this.variableMapStack = new ArrayList<>();
        this.variableMapStack.add(new HashMap<>(varMap)); // TODO: deepCopy 필요 여부 확인하기
        this.labelMap = new HashMap<>(labelMap);
        this.transcriptionMap = new LinkedHashMap<>();
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
}
