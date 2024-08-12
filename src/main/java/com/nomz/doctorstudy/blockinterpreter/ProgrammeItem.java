package com.nomz.doctorstudy.blockinterpreter;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class ProgrammeItem {
    private final int phase;
    private final String content;
}