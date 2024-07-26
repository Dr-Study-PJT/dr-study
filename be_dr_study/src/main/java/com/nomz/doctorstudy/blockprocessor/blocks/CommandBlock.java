package com.nomz.doctorstudy.blockprocessor.blocks;

import java.util.List;

public abstract class CommandBlock extends Block {
    protected CommandBlock(Class<?> returnType, List<Class<?>> parameterTypes) {
        super(returnType, parameterTypes);
    }

    public abstract void execute();
}
