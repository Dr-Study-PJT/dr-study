package com.nomz.doctorstudy.blockprocessor.blocks;

import java.util.List;

public abstract class ValueBlock extends Block {
    protected ValueBlock(Class<?> returnType, List<Class<?>> parameterTypes) {
        super(returnType, parameterTypes);
    }

    protected abstract Object getValue();
}
