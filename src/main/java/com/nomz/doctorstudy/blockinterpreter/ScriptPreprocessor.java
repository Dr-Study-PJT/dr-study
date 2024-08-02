package com.nomz.doctorstudy.blockinterpreter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.*;

@Slf4j
@Component
public class ScriptPreprocessor {
    public String preprocessScript(String script) {
        log.debug("before preprocess:\n{}", script);

        script = removeWhiteCharacters(script);
        script = preprocessPhase(script);
        script = preprocessLoop(script);

        log.debug("after preprocess:\n{}", formatScript(script));

        return script;
    }

    private String removeWhiteCharacters(String script) {
        StringBuilder sb = new StringBuilder();

        boolean single_quotation_mark = false;
        boolean escape_flag = false;
        for (char ch : script.toCharArray()) {
            if (escape_flag) {
                sb.append(ch);
                escape_flag = false;
                continue;
            }
            switch (ch) {
                case '\\':
                    escape_flag = true;
                    break;

                case '\'':
                    single_quotation_mark ^= true;
                    sb.append(ch);
                    break;

                case ' ':
                case '\n':
                case '\t':
                    if (single_quotation_mark) {
                        if (ch == '\n') {
                            sb.append("\\\\");
                            sb.append("n");
                            break;
                        }
                        sb.append(ch);
                    }
                    break;

                default:
                    sb.append(ch);
            }
        }

        log.debug("after remove white characters:\n{}", formatScript(sb.toString()));

        return sb.toString();
    }

    private String preprocessPhase(String script) {
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
            int braceEndIdx = findBracketPairIndex(script, List.of('{', '}'), braceStartIdx);

            phaseMap.put(phaseNum, script.substring(braceStartIdx + 1, braceEndIdx));
            cursor = script.indexOf(BlockType.PHASE.getToken(), cursor);
        }

        StringBuilder sb = new StringBuilder();
        sb.append("declare_variable('current_phase');");
        for (Integer n : phaseMap.keySet()) {
            sb.append("set_int_variable('current_phase',").append(n).append(");");
            sb.append(phaseMap.get(n));
        }

        log.debug("after preprocess phase:\n{}", formatScript(sb.toString()));

        return sb.toString();
    }

    private String preprocessLoop(String script) {
        int loopSeq = 1;

        String loopFormat = removeWhiteCharacters("""
                    declare_variable('iter%d'); set_int_variable('iter%d', 1);
                    declare_variable('current_iterator'); set_string_variable('current_iterator', 'iter%d');
                    label('loop_start_%d');
                    jump(
                        compare_int(get_int_variable('iter%d'), '>', %s),
                        'loop_end_%d'
                    );
                    increase_depth();
                    %s
                    set_int_variable('iter%d', calculate(get_int_variable('iter%d'), '+', 1));
                    decrease_depth();
                    jump(true, 'loop_start_%d');
                    label('loop_end_%d');
                """);

        while (true) {
            int loopIdx = script.indexOf("loop(");
            if (loopIdx == -1) break;

            int parenthesesStartIdx = script.indexOf("(", loopIdx);
            int parenthesesEndIdx = findBracketPairIndex(script, List.of('(', ')'), parenthesesStartIdx);
            String loopArg = script.substring(parenthesesStartIdx + 1, parenthesesEndIdx);

            int braceStartIdx = script.indexOf("{", loopIdx);
            int braceEndIdx = findBracketPairIndex(script, List.of('{', '}'), braceStartIdx);

            String innerScript = script.substring(braceStartIdx + 1, braceEndIdx);

            String formattedLoop = String.format(loopFormat,
                    loopSeq,
                    loopSeq,
                    loopSeq,
                    loopSeq,
                    loopSeq,
                    loopArg,
                    loopSeq,
                    innerScript,
                    loopSeq,
                    loopSeq,
                    loopSeq,
                    loopSeq
            );
            loopSeq++;

            StringBuilder sb = new StringBuilder(script);
            sb.replace(loopIdx, braceEndIdx + 1, formattedLoop);
            script = sb.toString();
        }

        log.debug("after preprocess loop:\n{}", formatScript(script));
        return script;
    }

    private int findBracketPairIndex(String script, List<Character> bracket, int bracketStartIdx) {
        int bracketEndIdx = -1;
        int bracketCount = 0;

        int cursor = bracketStartIdx;
        for (; cursor < script.length(); cursor++) {
            if (script.charAt(cursor) == bracket.get(0)) {
                bracketCount++;
            }
            if (script.charAt(cursor) == bracket.get(1)) {
                if (--bracketCount == 0) {
                    bracketEndIdx = cursor;
                    break;
                }
            }
        }

        return bracketEndIdx;
    }

    private String formatScript(String script) {
        script = script.replace(";", ";\n");
        script = script.replace("{", "{\n");
        script = script.replace("}", "}\n");
        return script;
    }
}
