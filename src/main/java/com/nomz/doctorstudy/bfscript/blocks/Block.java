package com.nomz.doctorstudy.bfscript.blocks;

import lombok.Getter;

import java.util.List;

public abstract class Block {
    protected List<Block> args;
    protected final Class<?> returnType;
    protected final List<Class<?>> parameterTypes;

    protected Block(Class<?> returnType, List<Class<?>> parameterTypes) {
        this.returnType = returnType;
        this.parameterTypes = parameterTypes;
    }

    protected void validateArgs() {
        if (parameterTypes.size() != args.size()) {
            throw new RuntimeException("Argument type doesn't match parameter type");
        }
        for (int i=0; i< parameterTypes.size(); i++) {
            if (args.get(i).returnType != parameterTypes.get(i)) {
                throw new RuntimeException("Argument type doesn't match parameter type");
            }
        }
    }

    protected abstract Object execute();
}
