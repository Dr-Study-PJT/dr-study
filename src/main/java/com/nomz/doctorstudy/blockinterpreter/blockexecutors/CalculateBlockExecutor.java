package com.nomz.doctorstudy.blockinterpreter.blockexecutors;

import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.common.exception.CommonErrorCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
public class CalculateBlockExecutor extends BlockExecutor {
    public CalculateBlockExecutor() {
        super(Integer.class, List.of(Integer.class, String.class, Integer.class));
    }

    @Override
    protected Object executeAction(List<Object> args) {
        int leftOperand = (int) args.get(0);
        String operator = (String) args.get(1);
        int rightOperand = (int) args.get(2);

        // TODO: Unexpected operator token 으로 변경
        int result = switch (operator) {
            case "+" -> leftOperand + rightOperand;
            case "-" -> leftOperand - rightOperand;
            case "*" -> leftOperand * rightOperand;
            case "/" -> leftOperand / rightOperand;
            case "%" -> leftOperand % rightOperand;
            default -> throw new BusinessException(CommonErrorCode.INTERNAL_SERVER_ERROR);
        };

        log.debug("calculate: {} {} {} = {}", leftOperand, operator, rightOperand, result);

        return result;
    }
}
