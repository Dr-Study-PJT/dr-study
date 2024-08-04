package com.nomz.doctorstudy.blockinterpreter;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

class ScriptPreprocessorTest {
    private Map<String, Object> varMap;

    @BeforeEach
    void initializeMap() {
        varMap = new HashMap<>();
        varMap.put("var1", "var2");
        varMap.put("var2", 22);
        varMap.put("num_of_participant", "15");
    }

    @Test
    @DisplayName("흐름제어 풀기 테스트")
    void preprocessFlowControl() {
        final String script =
                """
                phase(2) {
                    GPT호출();
                }
                phase(1) {
                    zxcv();
                    loop(2) {
                        asdf();
                        qwer();
                        speak(get_participant_name(get_num_of_iteration()));
                    }
                    do_something();
                }
                """;


    }

    @Test
    @DisplayName("변수 테스트")
    void preprocessVariables() {
        String script =
                """
                phase(1) {
                    asdf();
                    print(get_string_variable('var1'));
                    print(get_int_variable(get_string_variable('var1')));
                }
                """;
    }


    @Test
    @DisplayName("전처리 테스트1")
    void preprocessAll() {
        String script =
                """
                phase(2) {
                    loop(3) {
                        print(get_num_of_iteration());
                        call_gpt(get_variable('var1'));
                    }
                }
                phase(1) {
                    print(hi);
                }
                """;
    }

    @Test
    @DisplayName("전처리 테스트2")
    void preprocessTest2() {
        String script =
                """
        phase( 1 ){
            speak(
                    get_answer_from_gpt_query(
                            concat_string(
                                    string_input('오늘의 스터디주제는'),
                                    get_string_variable('스터디 주제'),
                                    string_input('이야.\n총 참여인원은'),
                                    get_string_variable('현재 총 참여인원수'),
                                    string_input('명이야.\n지금 스터디가 시작되어, 너가 사회자로서 1단계를 수행해줘야해.\n사전에 안내해준 사회 방식에 따라, 사전안내를 수행해줘.')
                            )
                    )
            );
        }

        phase( 2 ){
            loop( get_int_variable( 'num_of_participant' ) ){
                let_participant_speak( get_num_of_iteration(), int_input(30) );
                let_ai_speak( get_answer_from_gpt_query( concat_string(
                                        get_num_of_iteration(),
                                        string_input('번째 참가자의 발표자의 발표가 끝났어.\n'),
                                        get_recent_record(1),
                                        string_input('그 다음을 진행해줘.')
                                )
                        )
                );

            }
        }
        """;
    }


    @Test
    @DisplayName("전처리 테스트3")
    void preprocessTest3() {
        String script =
                """
phase( 1 ){ 
    speak( 
        get_answer_from_gpt_query( 
            concat_string(
                string_input('오늘의 스터디주제는'), 
                get_string_variable('스터디 주제'),
                string_input('이야.\\n총 참여인원은'), 
                get_string_variable('현재 총 참여인원수'), 
                string_input('명이야.\\n지금 스터디가 시작되어, 너가 사회자로서 1단계를 수행해줘야해.\\n사전에 안내해준 사회 방식에 따라, 사전안내를 수행해줘.')
                )
            )
        ); 
}
phase( 2 ){ 
    loop( get_int_variable( 'num_of_participant' ) ){
        let_participant_speak( 
                        get_num_of_iteration(), int_input(30) 
                    );
        let_ai_speak( 
                        get_answer_from_gpt_query( 
                                                concat_string(
                                                    get_num_of_iteration(),
                                                    string_input('번째 참가자의 발표자의 발표가 끝났어.\\n'),
                                                    get_recent_record(1),
                                                    string_input('그 다음을 진행해줘.\\n')
                                                    ) 
                                                )
                    );

    }
}
phase( 3 ){
    loop( get_int_variable( 'num_of_participant' ) ){
        
        let_participant_speak( get_num_of_iteration(), int_input(30) );
        let_ai_speak( get_answer_from_gpt_query(
                concat_string(
                        get_num_of_iteration(),
                        string_input('번째 발표자의 피드백이 끝났어.\\n'),
                        get_recent_record(1),
                        string_input('다음 단계를 진행해줘\\n')
                )
            )
        );
    }
}

phase( 4 ) {
    let_ai_speak( get_answer_from_gpt_query(
          concat_string(
              
              string_input('마지막 단계인 4단계를 시작할거야.\\n사전에 안내해준대로, 사회자로서 너는 최종적인 스터디 요약 및 피드백을 제시하고 스터디 마무리 멘트까지 이어해줘.\\n 아래의 정보는 이번 스터디에 관한 여러 정보들이야 참고하도록 해.'),
              get_string_variable('스터디 주제'),
              get_int_variable( 'num_of_participant' )
              get_int_variable('그룹 내 누적 스터디회차')
              get_int_variable( '해당 컨퍼런스 진행시간' )
              get_int_variable( '해당 컨퍼런스 각 참여자별 발화시간 모음' )
          )  
        )
    );
}
""";
    }

    @Test
    @DisplayName("페이즈 구하기 전처리")
    void preprocessPhaseVariable() {
        final String script =
                """
                phase(2) {
                    get_int_variable('current_phase');
                }
                phase(1) {
                    zxcv();
                    get_int_variable('current_phase');
                }
                """;
    }
}
