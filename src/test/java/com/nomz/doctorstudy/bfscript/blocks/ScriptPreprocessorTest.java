package com.nomz.doctorstudy.bfscript.blocks;

import com.nomz.doctorstudy.blockprocessor.script.ScriptPreprocessor;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Map;

class ScriptPreprocessorTest {
    @Test
    @DisplayName("흐름제어 풀기 테스트")
    void preprocessFlowControl() {
        final String script =
                """
                phase(1) {
                    zxcv();
                    loop(2) {
                        asdf();
                        qwer();
                        speak(get_participant_name(get_num_of_iteration()));
                    }
                    do_something();
                    print(get_variable(myVar1));
                }
                
                phase(2) {
                    GPT호출();
                }
                """;

        ScriptPreprocessor scriptPreprocessor = new ScriptPreprocessor();
        Map<String, Object> varMap = Map.of("myVar1", "myVar1's value");
        String preprocessedScript = scriptPreprocessor.preprocessScript(script, varMap);
    }

    @Test
    @DisplayName("변수 테스트")
    void preprocessVariables() {
        String script =
                """
                phase(1) {
                    asdf();
                    print(get_variable(var1));
                    print(get_variable(get_variable(var1)));
                }
                """;

        ScriptPreprocessor scriptPreprocessor = new ScriptPreprocessor();
        Map<String, Object> varMap = Map.of(
                "var1", "var2",
                "var2", "12341234"
        );
        String preprocessedScript = scriptPreprocessor.preprocessScript(script, varMap);
    }
}
