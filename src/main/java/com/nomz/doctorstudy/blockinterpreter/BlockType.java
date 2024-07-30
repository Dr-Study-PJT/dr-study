package com.nomz.doctorstudy.blockinterpreter;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BlockType {
    GET_INT_VAR("get_int_variable"),
    SET_INT_VAR("set_int_variable"),
    GET_STRING_VAR("get_string_variable"),
    SET_STRING_VAR("set_string_variable"),
    PHASE("phase"),
    LOOP("loop"),
    GET_NUM_OF_ITERATION("get_num_of_iteration"),
    GET_PARTICIPANT_NAME("get_participant_name"),
    INT_TO_STRING("int_to_string"),
    BOOLEAN_TO_STRING("boolean_to_string"),
    CALCULATE("calculate"),
    COMPARE_INT("compare_int"),

    WAIT("wait"),
    STRING_INPUT("string_input"),
    INT_INPUT("int_input"),
    STRING_CONCAT("string_concat"),
    LOG("log"),
    LABEL("label"),
    JUMP("jump"),
    INCREASE_DEPTH("increase_depth"),
    DECREASE_DEPTH("decrease_depth"),
    DECLARE_VAR("declare_variable")
    ;
    private final String token;
}
