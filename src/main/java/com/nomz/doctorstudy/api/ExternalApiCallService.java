package com.nomz.doctorstudy.api;

public interface ExternalApiCallService {
    String gpt(String s);
    byte[] tts(String s);
    String stt(byte[] audio);
}

