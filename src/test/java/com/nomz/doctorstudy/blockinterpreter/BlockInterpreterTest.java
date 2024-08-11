package com.nomz.doctorstudy.blockinterpreter;

import com.nomz.doctorstudy.blockinterpreter.blockexecutors.BlockVariable;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
    import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashMap;
import java.util.Map;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@Slf4j
@SpringBootTest
class BlockInterpreterTest {
    @Autowired
    private BlockInterpreter blockInterpreter;
    private long processContextIdSequence = 1;

    private long getProcessContextIdSequence() {
        System.out.println("id = " + processContextIdSequence);
        return processContextIdSequence++;
    }

    @Test
    @DisplayName("초기화 테스트")
    public void initTest() {
        Map<String, Object> varMap;

        varMap = new HashMap<>();
        varMap.put("var1", "var2");
        varMap.put("var2", 1);

        String script =
                """
                phase(1) {
                    log(string_concat('hello ', 'world! ', '반갑습니다 ', '여러분들!'));
                    wait(3000);
                    log('hi');
                    wait(3000);
                    log(int_to_string(get_int_variable('current_phase')));
                }
                """;

        long id = getProcessContextIdSequence();

        blockInterpreter.init(id, script, varMap);
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
        blockInterpreter.init(id1, script1, varMap1);


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
        blockInterpreter.init(id2, script2, varMap2);

        blockInterpreter.interpret(id1);
        blockInterpreter.interpret(id2);
    }

    @Test
    @DisplayName("점프 블록 테스트")
    public void jumpBlockTest() {
        String script =
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
        blockInterpreter.init(id, script, varMap1);
        blockInterpreter.interpret(id);
    }
    
    @Test
    @DisplayName("연산 블록 테스트")
    public void calculateBlockTest() {
        String script =
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
        blockInterpreter.init(id, script, Map.of());
        blockInterpreter.interpret(id);
    }

    @Test
    @DisplayName("전처리 없이 반복 테스트")
    public void loopWithoutPreprocess() {
        String script =
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
        blockInterpreter.init(id, script, Map.of());
        blockInterpreter.interpret(id);
    }


    @Test
    @DisplayName("정수 비교 블록 테스트")
    public void compareIntBlockTest() {
        String script =
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
        blockInterpreter.init(id, script, Map.of());
        blockInterpreter.interpret(id);
    }


    @Test
    @DisplayName("반복 블록 테스트")
    public void loopTest() {
        String script =
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
        blockInterpreter.init(id, script, Map.of());
        blockInterpreter.interpret(id);
    }


    @Test
    @DisplayName("지역 변수 테스트")
    public void localVariableTest() {
        String script =
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
        blockInterpreter.init(id, script, Map.of());
        blockInterpreter.interpret(id);
    }

    @Test
    @DisplayName("중첩 반복문 테스트")
    public void nestedLoopTest() {
        String script =
                """
                phase(1) {
                    loop(3) {
                        log(string_concat('outer_iter=', int_to_string(get_int_variable(get_string_variable('current_iterator')))));
                        loop(3) {
                            log(string_concat('inner_iter=', int_to_string(get_int_variable(get_string_variable('current_iterator')))));
                        }
                        log('--------------------');
                    }
                }
                """;
        long id = getProcessContextIdSequence();
        blockInterpreter.init(id, script, Map.of());
        blockInterpreter.interpret(id);
    }
    
    @Test
    @DisplayName("Programme 모드 테스트")
    public void programmeTest() {
        String script =
                """
                phase(1) {
                    loop(2) {
                        let_avatar_speak('hi I'm A');
                        loop(3) {
                            let_participant_speak(1, 3);
                        }
                    }
                }
                """;
        long id = getProcessContextIdSequence();
        blockInterpreter.init(id, "", Map.of());
        blockInterpreter.interpret(id, ProcessMode.PROGRAMME);
    }
    
    @Test
    @DisplayName("아바타 말하기 테스트")
    public void letAvatarSpeakTest() {
        String script =
                """
                phase(1) {
                    let_avatar_speak('안녕하세요. 이 음성은 STT 기술을 이용해 만들어졌습니다.');
                }
                """;
        long id = getProcessContextIdSequence();
        blockInterpreter.init(id, script, Map.of());
        blockInterpreter.interpret(id);
    }

    @Test
    @DisplayName("GPT 테스트")
    public void gptTest() {
        String script =
                """
                phase(1) {
                    log(gpt_query('반갑다. 너는 얼마나 반갑니'));
                }
                """;
        long id = getProcessContextIdSequence();
        blockInterpreter.init(id, script, Map.of());
        blockInterpreter.interpret(id);
    }
    
    @Test
    @DisplayName("아바타 GPT 동시 테스트")
    public void avatarGptTest() {
        String script =
                """
                phase(1) {
                    let_avatar_speak(gpt_query('반갑다. 너는 얼마나 반갑니'));
                }
                """;
        long id = getProcessContextIdSequence();
        blockInterpreter.init(id, script, Map.of());
        blockInterpreter.interpret(id);
    }

    @Test
    @DisplayName("사회자 생성 페이지 결과 스크립트 테스트")
    public void moderatorCreateScriptTest() {
        String script =
                """
phase(1) {  let_avatar_speak( gpt_query( string_concat( '입력
' ) ) );}
                """;
        long id = getProcessContextIdSequence();
        blockInterpreter.init(id, "", Map.of());
        blockInterpreter.interpret(id);
    }

    @Test
    @DisplayName("문자열 이스케이프 테스트")
    public void escapeTest() {
        String script =
                """
                phase(1) {
                    log(string_concat('hel\\nlo ', 'w\\'orld! ', '반갑\\,습니다 ', '여러\t분들!'));
                }
                """;

        long id = getProcessContextIdSequence();

        blockInterpreter.init(id, script, Map.of());
        blockInterpreter.interpret(id);
    }
    
    @Test
    @DisplayName("스터디 주제 테스트")
    public void studySubjectTest() {
        String script =
                """
                phase(1) {
                    log(get_string_variable('study_subject'));
                }
                """;

        long id = getProcessContextIdSequence();

        blockInterpreter.init(id, script, Map.of(BlockVariable.STUDY_SUBJECT.getToken(), "스터디 주제!!!"));
        blockInterpreter.interpret(id);
    }

    @Test
    @DisplayName("참여자 인원 테스트")
    public void numOfParticipantTest() {
        String script =
                """
                phase(1) {
                    log(string_concat('참여자 인원 수 = ', int_to_string(get_num_of_participant())));
                }
                """;

        long id = getProcessContextIdSequence();

        blockInterpreter.init(id, script, Map.of());
        blockInterpreter.interpret(id);
    }
}