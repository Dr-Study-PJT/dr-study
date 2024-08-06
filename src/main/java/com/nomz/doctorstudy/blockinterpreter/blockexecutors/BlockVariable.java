package com.nomz.doctorstudy.blockinterpreter.blockexecutors;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum BlockVariable {
    PARTICIPANT_NAME("participant_name_"),
    NUM_OF_PARTICIPANT("num_of_participant"),
    CURRENT_PHASE("current_phase"),
    CURRENT_ITERATOR("current_iterator"),
    STUDY_SUBJECT("study_subject")
    ;

    private final String token;
}
