package com.nomz.doctorstudy.blockprocessor.blocks;


import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

@Slf4j
public class BlockProcessor {
    private final List<CommandBlock> blocks;

    public BlockProcessor(String script) {
        blocks = new ArrayList<>();
        initializeBlockList(script);
    }

    private void initializeBlockList(String script) {
        StringTokenizer st = new StringTokenizer(script, ";");
        while (st.hasMoreTokens()) {
            String stmt = st.nextToken();
            blocks.add(Blocks.cmdFromStatement(stmt));
        }
    }
}
