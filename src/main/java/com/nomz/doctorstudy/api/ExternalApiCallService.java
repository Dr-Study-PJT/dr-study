package com.nomz.doctorstudy.api;

public interface ExternalApiCallService {
    String gpt(String s);
    byte[] tts(String s, VoiceType type);
    String stt(byte[] audio);
}

