package com.nomz.doctorstudy.api;

public interface ExternalApiCallService {
    String gpt(String content);
    byte[] tts(String content, VoiceType type);
    String stt(byte[] audio);
}

