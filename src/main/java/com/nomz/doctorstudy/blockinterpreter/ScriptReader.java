package com.nomz.doctorstudy.blockinterpreter;

public class ScriptReader {

    /**
     * 스크립트를 읽어 따옴표, 이스케이프 문자를 처리한다.
     * 따옴표 내부이거나 이스케이프 처리 문자가 아닐 때 CharAction을 통해 어떻게 처리할 지 동작을 정의할 수 있다.
     * CharAction.action의 첫 번째 인자는 마지막으로 읽은 문자를 포함한 StringBuilder이다.
     * CharAction.action의 두 번째 인자는 마지막으로 읽은 문자이다.
     * @param script 따옴표 내 문자열 혹은 이스케이프를 처리할 스크립트
     * @param charAction 이스케이프나 따옴표 내의 문자가 아닌 경우의 동작
     * @return 스크립트를 다 읽고나서 버퍼에 남은 문자열
     */
    public static String readScript(String script, CharAction charAction) {
        StringBuilder buf = new StringBuilder();

        boolean single_quotation_mark = false;
        boolean escape_flag = false;

        for (char ch : script.toCharArray()) {
            if (single_quotation_mark) {
                if (escape_flag) {
                    escape_flag = false;
                    buf.append(ch);
                    continue;
                }
                if (ch == '\\') {
                    escape_flag = true;
                    buf.append(ch);
                    continue;
                }
                if (ch == '\'') {
                    single_quotation_mark = false;
                    buf.append(ch);
                    continue;
                }
                buf.append(ch);
                continue;
            }
            if (ch == '\'') {
                single_quotation_mark = true;
                buf.append(ch);
                continue;
            }

            charAction.action(buf, ch);
        }

        return buf.toString();
    }

    public interface CharAction {
        void action(StringBuilder buf, char ch);
    }
}
