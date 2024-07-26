package com.nomz.doctorstudy.blockprocessor.blocks;

import java.util.List;

public class WaitBlock extends CommandBlock {
    WaitBlock() {
        super(void.class, List.of(Integer.class));
    }

    @Override
    public void execute() {
        //wait;
    }
}
