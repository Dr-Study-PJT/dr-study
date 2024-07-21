package com.nomz.doctorstudy.bfscript.blocks;

import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.Map;
import java.util.StringTokenizer;

@Slf4j
public class Blocks {
    private static final Map<String, Class<? extends Block>> registry = Map.of(
            "wait", WaitBlock.class,
            "get_record",   GetRecordBlock.class
    );

    private static Block getBlockInstance(String methodName) {
        Class<? extends Block> clazz = registry.get(methodName);
        try {
            Constructor<? extends Block> constructor = clazz.getConstructor();
            return constructor.newInstance();
        } catch (NoSuchMethodException | InvocationTargetException | InstantiationException | IllegalAccessException e) {
            throw new RuntimeException("No such method name " + methodName, e);
        }
    }
    public static Block from(String stmt) {
        int bracketStartIdx = stmt.indexOf('(');
        int bracketEndIdx = stmt.lastIndexOf(')');

        final String methodName = stmt.substring(0, bracketStartIdx);
        final String argsContent = stmt.substring(bracketStartIdx + 1, bracketEndIdx);
        log.info("parsed: method={}, args={}", methodName, argsContent);

        Block block = getBlockInstance(methodName);

        StringTokenizer st = new StringTokenizer(argsContent, ",");
        while (st.hasMoreTokens()) {
            String arg = st.nextToken().strip();
            block.args.add(Blocks.from(arg));
        }

        block.validateArgs();

        return block;
    }
}
