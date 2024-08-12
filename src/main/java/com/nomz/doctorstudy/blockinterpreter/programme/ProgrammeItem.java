package com.nomz.doctorstudy.blockinterpreter.programme;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.util.Map;

@Getter
@RequiredArgsConstructor
@ToString
public class ProgrammeItem {
    private final int phase;
    private final Map<String, Object> content;
}