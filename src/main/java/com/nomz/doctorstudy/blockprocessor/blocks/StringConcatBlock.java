package com.nomz.doctorstudy.blockprocessor.blocks;

import java.util.List;

public class StringConcatBlock extends ValueBlock {
    protected StringConcatBlock() {
        super(String.class, List.of(String.class));
    }

    @Override
    protected void validateArgs() {
        for (int i=0; i< parameterTypes.size(); i++) {
            if (args.get(i).returnType != parameterTypes.get(0)) {
                throw new RuntimeException("Argument type doesn't match parameter type");
            }
        }
    }

    @Override
    public Object getValue() {
        StringBuilder sb = new StringBuilder();
        args.forEach(sb::append);
        return sb.toString();
    }
}
