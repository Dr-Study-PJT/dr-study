package com.nomz.doctorstudy.blockinterpreter;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ThreadProcessContext {
    private final ThreadLocal<ProcessContext> threadProcessContext = new ThreadLocal<>();


    public void init(ProcessContext processContext) {
        this.threadProcessContext.set(processContext);
    }

    public void close() {
        threadProcessContext.remove();
    }

    public long getProcessId() {
        return threadProcessContext.get().getId();
    }

    public int getLabelIndex(String name) {
        return threadProcessContext.get().getLabelIndex(name);
    }

    public void setLabelIndex(String name, int index) {
        threadProcessContext.get().setLabelIndex(name, index);
    }

    public int getCursor() {
        return threadProcessContext.get().getCursor();
    }

    public void setCursor(int cursor) {
        threadProcessContext.get().setCursor(cursor);
    }

    public void increaseCursor() {
        ProcessContext processContext = threadProcessContext.get();
        processContext.setCursor(processContext.getCursor() + 1);
    }

    public void increaseScopeDepth() {
        threadProcessContext.get().increaseScopeDepth();
    }

    public void decreaseScopeDepth() {
        threadProcessContext.get().decreaseScopeDepth();
    }

    public void declareVariable(String key) {
        threadProcessContext.get().declareVariable(key);
    }

    public Object getVariable(String key) {
        return threadProcessContext.get().getVariable(key);
    }

    public void setVariable(String key, Object val) {
        threadProcessContext.get().setVariable(key, val);
    }

    public boolean isEndOfBlock() {
        return threadProcessContext.get().isEndOfBlock();
    }

    public Block currentBlock() {
        return threadProcessContext.get().currentBlock();
    }

    public void addProgrammeInfo(String info) {
        threadProcessContext.get().addProgrammeInfo(info);
    }

    public List<String> getProgramme() {
        return threadProcessContext.get().getProgramme();
    }
}
