package com.nomz.doctorstudy.blockinterpreter;

import org.springframework.stereotype.Component;

@Component
public class ThreadProcessContext {
    private final ThreadLocal<ProcessContext> threadProcessContext = new ThreadLocal<>();


    public ProcessContext get() { return threadProcessContext.get(); }

    public void setProcessContext(ProcessContext processContext) {
        this.threadProcessContext.set(processContext);
    }

    public void removeProcessContext() {
        threadProcessContext.remove();
    }
}
