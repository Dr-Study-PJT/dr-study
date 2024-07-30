package com.nomz.doctorstudy.blockinterpreter;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ThreadProcessContext {
    private final ThreadLocal<ProcessContext> processContext = new ThreadLocal<>();

    public void init(ProcessContext processContext) {
        this.processContext.set(processContext);
    }

    public void close() {
        processContext.remove();
    }

    public int getLabelIndex(String name) {
        return processContext.get().getLabelIndex(name);
    }

    public void setLabelIndex(String name, int index) {
        processContext.get().setLabelIndex(name, index);
    }

    public int getCursor() {
        return processContext.get().cursor;
    }

    public void setCursor(int cursor) {
        processContext.get().cursor = cursor;
    }

    public void increaseCursor() {
        processContext.get().cursor++;
    }

    public void increaseScopeDepth() {
        processContext.get().increaseScopeDepth();
    }

    public void decreaseScopeDepth() {
        processContext.get().decreaseScopeDepth();
    }

    public void declareVariable(String key) {
        processContext.get().declareVariable(key);
    }

    public Object getVariable(String key) {
        return processContext.get().getVariable(key);
    }

    public void setVariable(String key, Object val) {
        processContext.get().setVariable(key, val);
    }

    public boolean isEndOfBlock() {
        return processContext.get().isEndOfBlock();
    }

    public Block currentBlock() {
        return processContext.get().currentBlock();
    }

    public void addProgrammeInfo(String info) {
        processContext.get().addProgrammeInfo(info);
    }

    public List<String> getProgramme() {
        return processContext.get().getProgramme();
    }
}
