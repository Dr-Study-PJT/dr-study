package com.nomz.doctorstudy.bfscript.blocks;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class ScriptPreprocessorTest {
    @Test
    @DisplayName("스크립트 해석 테스트")
    void preprocessScript() {
        final String script =
                """
                phase(1) {
                    zxcv();
                    loop(2) {
                        asdf();
                        qwer();
                        speak(get_participant_name(get_num_of_iteration()));
                    }
                    1234();
                }
                
                phase(2) {
                    GPT호출();
                }
                """;

        ScriptPreprocessor scriptPreprocessor = new ScriptPreprocessor();
        String preprocessedScript = scriptPreprocessor.preprocessScript(script);
    }
}