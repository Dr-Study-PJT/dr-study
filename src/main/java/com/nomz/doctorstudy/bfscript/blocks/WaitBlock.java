package com.nomz.doctorstudy.bfscript.blocks;

import java.util.List;

public class WaitBlock extends Block {
    WaitBlock() {
        super(void.class, List.of(Integer.class));
    }

    @Override
    public Object execute() {
        //wait;
        return null;
    }
}
