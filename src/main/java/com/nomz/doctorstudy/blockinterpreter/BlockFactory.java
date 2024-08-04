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
        log.debug("parsed: method={}, args={}", method, argsStr);

        List<Block> argBlocks = new ArrayList<>();
        List<String> args = tokenizeArgs(argsStr);
        for (String arg : args) {
            argBlocks.add(parseStatement(arg));
        }

        return new Block(method, argBlocks);
    }

    private List<String> tokenizeArgs(String argsStr) {
        List<String> args = new ArrayList<>();

        class BracketCounter { int count = 0; }
        BracketCounter bracketCounter = new BracketCounter();

        String lastBufStr = ScriptReader.readScript(argsStr, ((buf, ch) -> {
            switch (ch) {
                case '(':
                    buf.append(ch);
                    bracketCounter.count++;
                    break;

                case ')':
                    buf.append(ch);
                    bracketCounter.count--;
                    break;

                case ',':
                    if (bracketCounter.count == 0) {
                        args.add(buf.toString());
                        buf.setLength(0);
                    }
                    else {
                        buf.append(ch);
                    }
                    break;

                default:
                    buf.append(ch);
            }
        }));

        args.add(lastBufStr);

        return args;
    }
}
