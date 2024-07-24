package com.nomz.doctorstudy.blockprocessor.script;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

@Slf4j
@Component
public class ScriptPreprocessor {
    public String preprocessScript(String script, Map<String, Object> varMap) {
        log.info("before preprocess:\n{}", script);
        script = script.replaceAll(" ", "").replaceAll("\n", "");

        script = preprocessVariables(script, varMap);
        script = preprocessFlowControl(script);

        return script;
    }

    private String preprocessVariables(String script, Map<String, Object> varMap) {
        final String getVarMethodName = "get_variable";
        int getVarMethodIdx = script.indexOf(getVarMethodName);
        while (getVarMethodIdx != -1) {
            int bracketStartIdx = script.indexOf("(", getVarMethodIdx);
            int bracketEndIdx = script.indexOf(")", getVarMethodIdx);
            String varName = script.substring(bracketStartIdx + 1, bracketEndIdx);
            String regex = getVarMethodName + "\\(" + varName + "\\)";
            script = script.replaceFirst(regex, String.valueOf(varMap.get(varName)));
            getVarMethodIdx = script.lastIndexOf(getVarMethodName);
        }

        log.info("after preprocess variables:\n{}", script);
        return script;
    }

    private String preprocessFlowControl(String script) {
        Map<Integer, String> phaseMap = new HashMap<>();
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
                            phaseMap.put(contextStack.peek().arg, topContext.buffer.toString());
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
        StringBuilder builder = new StringBuilder();
        phaseMap.forEach((n, s) -> {
            builder.append("set_phase(").append(n).append(");\n");
            builder.append(s);
        });

        log.info("after preprocess flow control:\n{}", builder);
        return builder.toString();
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
