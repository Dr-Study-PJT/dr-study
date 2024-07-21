package com.nomz.doctorstudy.bfscript.blocks;

import java.util.Map;
import java.util.Stack;

public class BlockProcessor {
/*
    1. 변수 전처리
    2. 단계 전처리
    3. 루프 전처리
*/

    Map<String, Integer> intEnvVars;
    Map<String, String> strEnvVars;
    Map<String, String> phases;

    void readScript(String script) {

        Stack<ScriptContext> context;
        for (char ch : script.toCharArray()) {
        }
    }

    private static class ScriptContext {
        StringBuilder builder;
        String buffer;
    }
}
