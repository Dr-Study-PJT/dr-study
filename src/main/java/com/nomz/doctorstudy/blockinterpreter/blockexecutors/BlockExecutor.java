package com.nomz.doctorstudy.blockinterpreter.blockexecutors;

import com.nomz.doctorstudy.blockinterpreter.BlockErrorCode;
import com.nomz.doctorstudy.blockinterpreter.ProcessMode;
import com.nomz.doctorstudy.common.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
public abstract class BlockExecutor {
    public final Class<?> returnType;
    protected final List<Class<?>> parameterTypes;

    public boolean validateArgs(List<Object> args) {
        if (args.size() != parameterTypes.size()) {
            return false;
        }
        for (int i=0; i<args.size(); i++) {
            if (args.get(i).getClass() != parameterTypes.get(i)) {
                return false;
            }
        }
        return true;
    }

    public final Object execute(List<Object> args, ProcessMode processMode) {
        if (!validateArgs(args)) {
            throw new BusinessException(BlockErrorCode.ARGUMENT_TYPE_MISMATCH);
        }

        return switch (processMode) {
            case NORMAL, DEBUG -> executeAction(args);
            case PROGRAMME -> executeGetProgramme(args);
        };
    }

    protected abstract Object executeAction(List<Object> args);

    public Object executeGetProgramme(List<Object> args) {
        return executeAction(args);
    }
}
