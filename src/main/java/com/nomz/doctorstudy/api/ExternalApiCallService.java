package com.nomz.doctorstudy.api;

public interface ExternalApiCallService {
    String gpt(String s);
    Byte[] tts(String s);
    String stt(Byte[] audio);
}
