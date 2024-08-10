package com.nomz.doctorstudy.blockinterpreter;

import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.common.exception.CommonErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class ScriptPreprocessor {
    private final BlockFactory blockFactory;
    private static final int LOOP_LIMIT = 1_000_000_000;

    public List<Block> preprocessScript(String script) {
        log.debug("before preprocess:\n{}", script);

        script = removeWhiteCharacters(script);
        script = preprocessPhase(script);
        script = preprocessLoop(script);

        log.debug("after preprocess:\n{}", formatScript(script));

        List<String> stmts = extractStatementsFromScript(script);
        List<Block> blocks = extractBlocksFromStatements(stmts);

        return blocks;
    }

    private String removeWhiteCharacters(String script) {
        StringBuilder scriptBuffer = new StringBuilder();

        ScriptReader.readScript(script, (buf, ch) -> {
            switch (ch) {
                case '\n':
                case '\r':
                case ' ':
                case '\t':
                    scriptBuffer.append(buf);
                    buf.setLength(0);
                    break;

                default:
                    buf.append(ch);
                    scriptBuffer.append(buf);
                    buf.setLength(0);
            }
        });


        String preprocessedScript = scriptBuffer.toString();
        log.debug("after remove white characters:\n{}", formatScript(preprocessedScript));

        return preprocessedScript;
    }

    private String preprocessPhase(String script) {
        Map<Integer, String> phaseMap = new HashMap<>();
        int cursor = 0;
        boolean startFlag = true;

        int count = 0;
        while (true) {
            if (count++ > LOOP_LIMIT) {
                throw new BusinessException(CommonErrorCode.INTERNAL_SERVER_ERROR, "알 수 없는 이유로 무한루프가 발생했습니다.");
            }

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
            cursor = script.indexOf(BlockType.PHASE.getToken(), cursor + 1);
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

        int count = 0;
        while (true) {
            if (count++ > LOOP_LIMIT) {
                throw new BusinessException(CommonErrorCode.INTERNAL_SERVER_ERROR, "알 수 없는 이유로 무한루프가 발생했습니다.");
            }

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

    private List<String> extractStatementsFromScript(String preprocessedScript) {
        List<String> stmts = new ArrayList<>();

        ScriptReader.readScript(preprocessedScript, (buf, ch) -> {
            buf.append(ch);
            if (ch == ';') {
                String stmt = buf.toString();
                log.debug("tokenized Statement => {}", stmt);
                stmts.add(stmt);
                buf.setLength(0);
            }
        });

        return stmts;
    }

    private List<Block> extractBlocksFromStatements(List<String> stmts) {
        List<Block> blocks = new ArrayList<>();

        for (String stmt : stmts) {
            Block parsedBlock = blockFactory.parseStatement(stmt);

            // 인수블록이 하나인데 Method가 빈 문자열이라면 인수가 없다는 뜻이므로 제거
            if (parsedBlock.getArgBlocks().size() == 1 && parsedBlock.getArgBlocks().get(0).getMethod().isEmpty()) {
                parsedBlock.getArgBlocks().clear();
            }

            blocks.add(parsedBlock);
        }

        return blocks;
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
        int scopeDepth; // TODO: char 하나씩 읽어서 스코프 깊이에 따라 indent까지 삽입된 결과
        script = script.replace(";", ";\n");
        script = script.replace("{", "{\n");
        script = script.replace("}", "}\n");

        return script;
    }
}
