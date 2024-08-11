package com.nomz.doctorstudy.blockinterpreter;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BlockType {
    // Flow Control Blocks
    PHASE("phase"),
    LOOP("loop"),

    // Command Blocks
    WAIT("wait"),
    DECLARE_VAR("declare_variable"),
    LABEL("label"),
    JUMP("jump"),
    INCREASE_DEPTH("increase_depth"),
    DECREASE_DEPTH("decrease_depth"),
    LOG("log"),
    LET_AVATAR_SPEAK("let_avatar_speak"),
    LET_PARTICIPANT_SPEAK("let_participant_speak"),

    // Value Blocks,
    GET_INT_VAR("get_int_variable"),
    SET_INT_VAR("set_int_variable"),
    GET_STRING_VAR("get_string_variable"),
    SET_STRING_VAR("set_string_variable"),

    INT_TO_STRING("int_to_string"),
    BOOLEAN_TO_STRING("boolean_to_string"),
    STRING_CONCAT("string_concat"),

    CALCULATE("calculate"),
    COMPARE_INT("compare_int"),

    GET_PARTICIPANT_NAME("get_participant_name"),
    GET_NUM_OF_PARTICIPANT("get_num_of_participant"),
    GET_NUM_OF_ITERATION("get_num_of_iteration"),

    GPT_QUERY("gpt_query")
    ;
    
    private final String token;
}
