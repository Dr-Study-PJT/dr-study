package com.nomz.doctorstudy.bfscript.blocks;

import java.util.List;

public class GetRecordBlock extends Block{
    GetRecordBlock() {
        super(String.class, List.of(Integer.class));
    }

    @Override
    public Object execute() {
        return null;
    }
}
