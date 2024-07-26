package com.nomz.doctorstudy.blockprocessor.script;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.*;

@Slf4j
@Component
public class ScriptPreprocessor {
    private final String GET_INT_VAR = "get_int_variable";
    private final String GET_STRING_VAR = "get_string_variable";
    private final String SET_INT_VAR = "set_int_variable";
    private final String SET_STRING_VAR = "set_string_variable";
    private final String PHASE = "phase";
    private final String LOOP = "loop";
    private final String GET_NUM_OF_ITERATION = "get_num_of_iteration()";

    public String preprocessScript(String script, Map<String, Object> varMap) {
        log.info("before preprocess:\n{}", script);
        script = script.replaceAll(" ", "").replaceAll("\n", "");

        script = preprocessPhase(script, varMap);
        script = preprocessVariables(script, varMap);
        script = preprocessLoop(script);

        log.info("after preprocess:\n{}", formatScript(script));

        return script;
    }

    private String preprocessPhase(String script, Map<String, Object> varMap) {
        Map<Integer, String> phaseMap = new HashMap<>();
        int cursor = 0;
        boolean startFlag = true;

        while (true) {
            cursor = script.indexOf("phase", cursor);
            if (cursor == -1) break;
            if (cursor == 0 && !startFlag) break;
            startFlag = false;

            int parenthesesStartIdx = script.indexOf("(", cursor);
            int parenthesesEndIdx = script.indexOf(")", cursor);
            String phaseArg = script.substring(parenthesesStartIdx + 1, parenthesesEndIdx);
            int phaseNum = Integer.parseInt(phaseArg);

            int braceStartIdx = script.indexOf("{", cursor);
            int braceEndIdx = -1;
            int braceCount = 0;

            for (; cursor < script.length(); cursor++) {
                if (script.charAt(cursor) == '{') {
                    braceCount++;
                }
                if (script.charAt(cursor) == '}') {
                    if (--braceCount == 0) {
                        braceEndIdx = cursor;
                        break;
                    }
                }
            }

            phaseMap.put(phaseNum, script.substring(braceStartIdx + 1, braceEndIdx));
            cursor = script.indexOf(PHASE, cursor);
        }

        StringBuilder sb = new StringBuilder();
        for (Integer n : phaseMap.keySet()) {
            sb.append("set_int_variable('current_phase',").append(n).append(");");
            sb.append(phaseMap.get(n));
        }

        log.debug("after preprocess phase:\n{}", formatScript(sb.toString()));

        return sb.toString();
    }

    private String preprocessVariables(String script, Map<String, Object> varMap) {
        final List<String> getVarMethodList = List.of(GET_INT_VAR, GET_STRING_VAR);
        final List<String> setVarMethodList = List.of(SET_INT_VAR, SET_STRING_VAR);

        int lastSetVarMethodIdx = 0;
        boolean lastSetVarMethodFlag = false;
        while (true) {
            int setVarMethodIdx = script.length();
            String setVarMethod = null;

            for (String candSetVarMethod : setVarMethodList) {
                int candIdx = script.indexOf(candSetVarMethod, lastSetVarMethodIdx);
                if (candIdx == -1) continue;
                if (candIdx < setVarMethodIdx) {
                    setVarMethodIdx = candIdx;
                    setVarMethod = candSetVarMethod;
                }
            }

            String setVarValue = null;
            String setVarName = null;
            String setVarRegex = null;
            if (setVarMethodIdx == script.length()) {
                lastSetVarMethodFlag = true;
            }
            else {
                lastSetVarMethodIdx = setVarMethodIdx;

                int setVarBracketStartIdx = script.indexOf("(", setVarMethodIdx);
                int setVarBracketEndIdx = script.indexOf(")", setVarMethodIdx);
                String setVarArgs = script.substring(setVarBracketStartIdx + 1, setVarBracketEndIdx);
                StringTokenizer setVarSt = new StringTokenizer(setVarArgs, ",");

                setVarName = setVarSt.nextToken();
                setVarName = setVarName.substring(1, setVarName.length() - 1);
                setVarValue = setVarSt.nextToken();
                setVarRegex = setVarMethod + "\\('" + setVarName + "'," + setVarValue + "\\);";
            }

            while (true) {
                int getVarMethodIdx = -1;
                String getVarMethod = null;

                for (String candGetVarMethod : getVarMethodList) {
                    int candIdx = script.lastIndexOf(candGetVarMethod, setVarMethodIdx);
                    if (candIdx == -1) continue;
                    if (candIdx > getVarMethodIdx) {
                        getVarMethodIdx = candIdx;
                        getVarMethod = candGetVarMethod;
                    }
                }

                if (getVarMethodIdx == -1) break;
                
                // getMethod 적용
                int bracketStartIdx = script.indexOf("(", getVarMethodIdx);
                int bracketEndIdx = script.indexOf(")", getVarMethodIdx);

                String varName = script.substring(bracketStartIdx + 1, bracketEndIdx);
                varName = removeParentheses(varName);
                String regex = getVarMethod + "\\('" + varName + "'\\)";

                String var = null;
                if (getVarMethod.equals(GET_INT_VAR)) {
                    var = getIntVarFromMap(varName, varMap);
                }
                if (getVarMethod.equals(GET_STRING_VAR)) {
                    var = getStringVarFromMap(varName, varMap);
                }
                if (var == null) {
                    throw new RuntimeException("심각한 오류: 이름이 같아야 하는데 다름");
                }
                String replacement = String.valueOf(var);

                script = script.replaceFirst(regex, replacement);
            }

            if (lastSetVarMethodFlag) break;

            // setMethod 적용
            script = script.replaceFirst(setVarRegex, "");

            if (setVarMethod.equals(SET_INT_VAR)) {
                varMap.put(setVarName, Integer.parseInt(setVarValue));
            }
            if (setVarMethod.equals(SET_STRING_VAR)) {
                varMap.put(setVarName, setVarValue);
            }
        }



/*
        final List<String> setVarMethodList = List.of(SET_INT_VAR, SET_STRING_VAR);
        for (String setVarMethodName : setVarMethodList) {
            int setVarMethodIdx = script.indexOf(setVarMethodName);
            while (setVarMethodIdx != -1) {
                int bracketStartIdx = script.indexOf("(", setVarMethodIdx);
                int bracketEndIdx = script.indexOf(")", setVarMethodIdx);
                StringTokenizer st =  new StringTokenizer(script.substring(bracketStartIdx + 1, bracketEndIdx), ",");
                String varName = st.nextToken();
                varName = varName.substring(1, varName.length() - 1);
                String varValue = st.nextToken();
                String regex = setVarMethodName + "\\('" + varName + "'," + varValue + "\\);";
                script = script.replaceFirst(regex, "");
                if (setVarMethodName.equals(SET_INT_VAR)) {
                    varMap.put(varName, Integer.parseInt(varValue));
                }
                if (setVarMethodName.equals(SET_STRING_VAR)) {
                    varMap.put(varName, varValue);
                }
                setVarMethodIdx = script.lastIndexOf(setVarMethodName);
            }
        }

        final List<String> getVarMethodList = List.of(GET_INT_VAR, GET_STRING_VAR);
        for (String getVarMethodName : getVarMethodList) {
            int getVarMethodIdx = script.indexOf(getVarMethodName);

            while (getVarMethodIdx != -1) {
                int bracketStartIdx = script.indexOf("(", getVarMethodIdx);
                int bracketEndIdx = script.indexOf(")", getVarMethodIdx);

                String varName = script.substring(bracketStartIdx + 1, bracketEndIdx);
                varName = removeParentheses(varName);
                String regex = getVarMethodName + "\\('" + varName + "'\\)";
                Object var = varMap.get(varName);
                String replacement = String.valueOf(var);

                if (var instanceof String) {
                    replacement = addParentheses(replacement);
                }

                script = script.replaceFirst(regex, replacement);
                getVarMethodIdx = script.lastIndexOf(getVarMethodName);
            }
        }
 */

        log.debug("after preprocess variables:\n{}", formatScript(script));
        return script;
    }

    private String preprocessLoop(String script) {
        Stack<ScriptContext> contextStack = new Stack<>();
        contextStack.push(new ScriptContext());
        StringBuilder methodNameBuffer = new StringBuilder();

        for (int cursor = 0; cursor< script.length(); cursor++) {
            final char ch = script.charAt(cursor);
            switch (ch) {
                case ';':
                    methodNameBuffer = new StringBuilder();
                    contextStack.peek().buffer.append(ch);
                    break;
                case '{':
                    contextStack.peek().method = getMethodFromStatement(methodNameBuffer.toString());
                    contextStack.peek().arg = getIntArgFromStatement(methodNameBuffer.toString());
                    int idxOfMethod = contextStack.peek().buffer.lastIndexOf(contextStack.peek().method);
                    contextStack.peek().buffer.delete(idxOfMethod, contextStack.peek().buffer.length());

                    contextStack.push(new ScriptContext());
                    methodNameBuffer = new StringBuilder();
                    break;
                case '}':
                    ScriptContext topContext = contextStack.peek();
                    contextStack.pop();
                    if (contextStack.peek().method.equals(LOOP)) {
                        int loopCount = contextStack.peek().arg;
                        final String iterNumMethodName = GET_NUM_OF_ITERATION;
                        for (int i = 1; i <= loopCount; i++) {
                            String topContextBuffer = topContext.buffer.toString();
                            int iterNumIdx = topContextBuffer.indexOf(iterNumMethodName);
                            while (iterNumIdx != -1) {
                                topContextBuffer = topContextBuffer.replace(iterNumMethodName, String.valueOf(i));
                                iterNumIdx = topContextBuffer.indexOf(iterNumMethodName);
                            }
                            contextStack.peek().buffer.append(topContextBuffer);
                        }
                    }
                    break;
                default:
                    contextStack.peek().buffer.append(ch);
                    methodNameBuffer.append(ch);
                    break;
            }
        }

        String result = contextStack.peek().buffer.toString();
        log.debug("after preprocess loop:\n{}", formatScript(result));
        return result;
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

    private String getIntVarFromMap(String key, Map<String, Object> varMap) {
        String val = String.valueOf(varMap.get(key));
        if (val == null) return "null";
        return val;
    }

    private String getStringVarFromMap(String key, Map<String, Object> varMap) {
        return "'" + varMap.get(key) + "'";
    }

    private String getMethodFromStatement(String stmt) {
        int firstIdxOfBracket = stmt.indexOf("(");
        return stmt.substring(0, firstIdxOfBracket);
    }

    private Integer getIntArgFromStatement(String stmt) {
        int firstIdxOfBracket = stmt.indexOf("(");
        int endIdxOfBracket = stmt.lastIndexOf(")");
        return Integer.parseInt(stmt.substring(firstIdxOfBracket + 1, endIdxOfBracket));
    }

    private List<String> getArgsFromInnerBracket(String stmt) {
        return null;
    }

    private String removeParentheses(String str) {
        if (!str.startsWith("'") || !str.endsWith("'")) {
            log.warn("문자열 따옴표 감싸야함");
        }
        return str.substring(1, str.length() - 1);
    }

    private String formatScript(String script) {
        script = script.replace(";", ";\n");
        script = script.replace("{", "{\n");
        script = script.replace("}", "}\n");
        return script;
    }
}
