package com.nomz.doctorstudy.bfscript.blocks;

import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

@Slf4j
public class ScriptPreprocessor {
    Map<String, Integer> intEnvVars;
    Map<String, String> strEnvVars;
    Map<Integer, String> phases;

    public ScriptPreprocessor() {
        intEnvVars = new HashMap<>();
        strEnvVars = new HashMap<>();
        phases = new HashMap<>();
    }

    public String preprocessScript(String script) {
        log.info("before preprocess:\n{}", script);
        script = script.replaceAll(" ", "").replaceAll("\n", "");

        preprocessFlowControl(script);

        StringBuilder builder = new StringBuilder();
        phases.forEach((n, s) -> {
            builder.append("set_phase(").append(n).append(");\n");
            builder.append(s);
        });

        log.info("after preprocess:\n{}", builder);
        return builder.toString();
    }

    private void preprocessFlowControl(String script) {
        Stack<ScriptContext> contextStack = new Stack<>();
        contextStack.push(new ScriptContext());
        StringBuilder methodNameBuffer = new StringBuilder();
        for (int cursor = 0; cursor< script.length(); cursor++) {
            final char ch = script.charAt(cursor);
            switch (ch) {
                case ';':
                    methodNameBuffer = new StringBuilder();
                    contextStack.peek().buffer.append(ch).append("\n");
                    break;
                case '{':
                    contextStack.peek().method = getMethodFromStatement(methodNameBuffer.toString());
                    contextStack.peek().arg = getArgFromStatement(methodNameBuffer.toString());
                    int idxOfMethod = contextStack.peek().buffer.lastIndexOf(contextStack.peek().method);
                    contextStack.peek().buffer.delete(idxOfMethod, contextStack.peek().buffer.length());

                    contextStack.push(new ScriptContext());
                    methodNameBuffer = new StringBuilder();
                    break;
                case '}':
                    // 액션이 루프면 복사, 페이즈면 phase 맵에 올리기
                    ScriptContext topContext = contextStack.peek();
                    contextStack.pop();
                    switch (contextStack.peek().method) {
                        case "phase":
                            phases.put(contextStack.peek().arg, topContext.buffer.toString());
                            break;
                        case "loop":
                            int loopCount = contextStack.peek().arg;
                            final String iterNumMethodName = "get_num_of_iteration()";
                            for (int i=1; i<=loopCount; i++) {
                                String topContextBuffer = topContext.buffer.toString();
                                int iterNumIdx = topContextBuffer.indexOf(iterNumMethodName);
                                while (iterNumIdx != -1) {
                                    topContextBuffer = topContextBuffer.replace(iterNumMethodName, String.valueOf(i));
                                    iterNumIdx = topContextBuffer.indexOf(iterNumMethodName);
                                }
                                contextStack.peek().buffer.append(topContextBuffer);
                            }
                            break;
                    }
                    break;
                default:
                    contextStack.peek().buffer.append(ch);
                    methodNameBuffer.append(ch);
                    break;
            }
        }
    }

    private void preprocessVariables() {
        phases.forEach((n, s) -> {

        });
    }

    private static class ScriptContext {
        String method;
        Integer arg;
        StringBuilder buffer;

        public ScriptContext() {
            this.method = "None";
            buffer = new StringBuilder();
        }
    }

    private String getMethodFromStatement(String stmt) {
        int firstIdxOfBracket = stmt.indexOf("(");
        return stmt.substring(0, firstIdxOfBracket);
    }

    private Integer getArgFromStatement(String stmt) {
        int firstIdxOfBracket = stmt.indexOf("(");
        int endIdxOfBracket = stmt.indexOf(")");
        return Integer.parseInt(stmt.substring(firstIdxOfBracket + 1, endIdxOfBracket));
    }
}
