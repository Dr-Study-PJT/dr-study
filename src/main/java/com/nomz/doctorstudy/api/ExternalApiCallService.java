package com.nomz.doctorstudy.api;

import com.nomz.doctorstudy.moderator.VoiceType;

public interface ExternalApiCallService {
    String gpt(String content);
    byte[] tts(String content, VoiceType type);
    String stt(byte[] audio);
}

