package com.nomz.doctorstudy.bfscript.blocks;

import java.util.Stack;
import java.util.StringTokenizer;

public class ScriptReader {
    public void read(String script) {
        while (true) {
            int braceStartIdx = script.indexOf('{');
            if (braceStartIdx == -1) break;
            int braceEndIdx = script.lastIndexOf('}');
        }
    }
}
