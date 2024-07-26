package com.nomz.doctorstudy.blockprocessor.blocks;

import java.util.List;

public class GetRecordBlock extends CommandBlock{
    GetRecordBlock() {
        super(String.class, List.of(Integer.class));
    }

    @Override
    public void execute() {

    }
}
