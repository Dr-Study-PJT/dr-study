package com.nomz.doctorstudy.blockinterpreter;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@SpringBootTest
class BlockInterpreterTest {
    @Autowired
    private BlockInterpreter blockInterpreter;
    @Autowired
    private ScriptPreprocessor scriptPreprocessor;
    private long processContextIdSequence = 1;

    private long getProcessContextIdSequence() {
        return processContextIdSequence++;
    }

    @Test
    @DisplayName("초기화 테스트")
    public void initTest() {
        Map<String, Object> varMap;
        String preprocessedScript;

        varMap = new HashMap<>();
        varMap.put("var1", "var2");
        varMap.put("var2", 1);
        varMap.put("num_of_participant", "15");

        String script =
                """
                phase(1) {
                    log(string_concat('hello ', 'world! ', '반갑습니다 ', '여러분들!'));
                    log('hi');
                    log(int_to_string(get_int_variable('current_phase')));
                }
                """;

        preprocessedScript = scriptPreprocessor.preprocessScript(script);

        long id = getProcessContextIdSequence();

        blockInterpreter.init(id, preprocessedScript, varMap);
        blockInterpreter.interpret(id);
    }

    @Test
    @DisplayName("멀티쓰레드 테스트")
    public void multiThreadTest() {
        String script1 =
                """
                phase(1) {
                    loop(10) {
                        log(get_string_variable(get_string_variable('var1')));
                    }
                }
                """;
        Map<String, Object> varMap1 = new HashMap<>();
        varMap1.put("var1", "var5");
        varMap1.put("var5", "Thread1");

        long id1 = getProcessContextIdSequence();
        String preprocessedScript1 = scriptPreprocessor.preprocessScript(script1);
        blockInterpreter.init(id1, preprocessedScript1, varMap1);


        String script2 =
                """
                phase(1) {
                    loop(10) {
                        log(get_string_variable(get_string_variable('var1')));
                    }
                }
                """;
        Map<String, Object> varMap2 = new HashMap<>();
        varMap2.put("var1", "var10");
        varMap2.put("var10", "Thread2");

        long id2 = getProcessContextIdSequence();
        String preprocessedScript2 = scriptPreprocessor.preprocessScript(script2);
        blockInterpreter.init(id2, preprocessedScript2, varMap2);

        blockInterpreter.interpret(id1);
        blockInterpreter.interpret(id2);
    }

    @Test
    @DisplayName("점프 블록 테스트")
    public void jumpBlockTest() {
        String script1 =
                """
                phase(1) {
                    log('1');
                    jump(true, '1');
                    log('2');
                    label('1');
                    log('3');
                }
                """;
        Map<String, Object> varMap1 = new HashMap<>();
        varMap1.put("var1", 1);
        long id = getProcessContextIdSequence();
        String preprocessedScript1 = scriptPreprocessor.preprocessScript(script1);
        blockInterpreter.init(id, preprocessedScript1, varMap1);
        blockInterpreter.interpret(id);
    }
    
    @Test
    @DisplayName("연산 블록 테스트")
    public void calculateBlockTest() {
        String script1 =
                """
                phase(1) {
                    log(int_to_string(calculate(6, '+', 3)));
                    log(int_to_string(calculate(6, '-', 3)));
                    log(int_to_string(calculate(6, '*', 3)));
                    log(int_to_string(calculate(6, '/', 3)));
                    log(int_to_string(calculate(6, '%', 3)));
                }
                """;
        long id = getProcessContextIdSequence();
        String preprocessedScript1 = scriptPreprocessor.preprocessScript(script1);
        blockInterpreter.init(id, preprocessedScript1, Map.of());
        blockInterpreter.interpret(id);
    }

    @Test
    @DisplayName("전처리 없이 반복 테스트")
    public void loopWithoutPreprocess() {
        String script1 =
                """
                phase(1) {
                    declare_variable('i');
                    set_int_variable('i', 5);
                    label('1');
                    log(string_concat(
                            'loop - ',
                            int_to_string(get_int_variable('i'))
                        )
                    );
                    set_int_variable('i',
                        calculate(get_int_variable('i'), '-', 1)
                    );
                    jump(compare_int(get_int_variable('i'), '>', 0), '1');
                }
                """;
        long id = getProcessContextIdSequence();
        String preprocessedScript1 = scriptPreprocessor.preprocessScript(script1);
        blockInterpreter.init(id, preprocessedScript1, Map.of());
        blockInterpreter.interpret(id);
    }


    @Test
    @DisplayName("정수 비교 블록 테스트")
    public void compareIntBlockTest() {
        String script1 =
                """
                phase(1) {
                    log(boolean_to_string(compare_int(5, '==', 5)));
                    log(boolean_to_string(compare_int(5, '>', 5)));
                    log(boolean_to_string(compare_int(5, '<', 5)));
                    log(boolean_to_string(compare_int(5, '>=', 5)));
                    log(boolean_to_string(compare_int(5, '<=', 5)));
                }
                """;
        long id = getProcessContextIdSequence();
        String preprocessedScript1 = scriptPreprocessor.preprocessScript(script1);
        blockInterpreter.init(id, preprocessedScript1, Map.of());
        blockInterpreter.interpret(id);
    }


    @Test
    @DisplayName("반복 블록 테스트")
    public void loopTest() {
        String script1 =
                """
                phase(1) {
                    log('start!');
                    declare_variable('var1');
                    set_int_variable('var1', 5);
                    loop(get_int_variable('var1')) {
                        log('hi');
                    }
                    log('end!');
                }
                """;
        long id = getProcessContextIdSequence();
        String preprocessedScript1 = scriptPreprocessor.preprocessScript(script1);
        blockInterpreter.init(id, preprocessedScript1, Map.of());
        blockInterpreter.interpret(id);
    }


    @Test
    @DisplayName("지역 변수 테스트")
    public void localVariableTest() {
        String script1 =
                """
                phase(1) {
                    declare_variable('var1');
                    set_string_variable('var1', 'global');
                    loop(1) {
                        declare_variable('var1');
                        set_string_variable('var1', 'local');
                        log(get_string_variable('var1'));
                    }
                    log(get_string_variable('var1'));
                }
                """;
        long id = getProcessContextIdSequence();
        String preprocessedScript1 = scriptPreprocessor.preprocessScript(script1);
        blockInterpreter.init(id, preprocessedScript1, Map.of());
        blockInterpreter.interpret(id);
    }

    @Test
    @DisplayName("중첩 반복문 테스트")
    public void nestedLoopTest() {
        String script1 =
                """
                phase(1) {
                    loop(3) {
                        log(string_concat('outer_iter=', int_to_string(get_int_variable(get_string_variable('current_iterator')))));
                        loop(3) {
                            log(string_concat('inner_iter=', int_to_string(get_int_variable(get_string_variable('current_iterator')))));
                        }
                    }
                }
                """;
        long id = getProcessContextIdSequence();
        String preprocessedScript1 = scriptPreprocessor.preprocessScript(script1);
        blockInterpreter.init(id, preprocessedScript1, Map.of());
        blockInterpreter.interpret(id);
    }
    
    @Test
    @DisplayName("Programme 모드 테스트")
    public void programmeTest() {
        String script1 =
                """
                phase(1) {
                    loop(2) {
                        let_avatar_speak('hi I\\'m A');
                        loop(3) {
                            let_participant_speak(1, 3);
                        }
                    }
                }
                """;
        long id = getProcessContextIdSequence();
        String preprocessedScript1 = scriptPreprocessor.preprocessScript(script1);
        blockInterpreter.init(id, preprocessedScript1, Map.of());
        blockInterpreter.interpret(id, ProcessMode.PROGRAMME);
    }
    
    @Test
    @DisplayName("뮤트 제어신호 테스트")
    public void muteSignalTest() {
        String script1 =
                """
                phase(1) {
                    loop(5) {
                        let_avatar_speak('hi');
                        wait(1);
                        let_participant_speak(1, 1);
                        wait(3);
                    }
                }
                """;
        long id = getProcessContextIdSequence();
        String preprocessedScript1 = scriptPreprocessor.preprocessScript(script1);
        blockInterpreter.init(id, preprocessedScript1, Map.of());
        blockInterpreter.interpret(id);
    }


    @Test
    @DisplayName("사회자 생성 페이지 결과 스크립트 테스트")
    public void moderatorCreateScriptTest() {
        String script1 =
                """
phase(1) {  let_avatar_speak( gpt_query( string_concat( '입력
' ) ) );}
                """;
        long id = getProcessContextIdSequence();
        String preprocessedScript1 = scriptPreprocessor.preprocessScript(script1);
        blockInterpreter.init(id, preprocessedScript1, Map.of());
        blockInterpreter.interpret(id);
    }
}