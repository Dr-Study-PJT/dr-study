package com.nomz.doctorstudy.blockinterpreter;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class BlockFactory {
    public Block parseStatement(String stmt) {
        int bracketStartIdx = stmt.indexOf('(');
        int bracketEndIdx = stmt.lastIndexOf(')');

        if (bracketStartIdx == -1) {
            return new Block(stmt, null);
        }

        final String method = stmt.substring(0, bracketStartIdx);
        final String argsStr = stmt.substring(bracketStartIdx + 1, bracketEndIdx);
        log.info("parsed: method={}, args={}", method, argsStr);

        List<Block> argBlocks = new ArrayList<>();
        List<String> args = argsTokenizer(argsStr);
        for (String arg : args) {
            argBlocks.add(parseStatement(arg));
        }

        return new Block(method, argBlocks);
    }

    private List<String> argsTokenizer(String argsStr) {
        List<String> args = new ArrayList<>();

        int bracket_count = 0;
        StringBuilder buffer = new StringBuilder();
        for (char ch : argsStr.toCharArray()) {
            switch (ch) {
                case '(':
                    buffer.append(ch);
                    bracket_count++;
                    break;

                case ')':
                    buffer.append(ch);
                    bracket_count--;
                    break;

                case ',':
                    if (bracket_count > 0) {
                        buffer.append(ch);
                    }
                    else {
                        args.add(buffer.toString());
                        buffer.setLength(0);
                    }
                    break;

                default:
                    buffer.append(ch);
                    break;
            }
        }
        args.add(buffer.toString());

        return args;
    }
}
