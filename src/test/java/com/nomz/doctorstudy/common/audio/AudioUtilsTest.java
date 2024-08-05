package com.nomz.doctorstudy.common.audio;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

@Slf4j
class AudioUtilsTest {
    private static final String UPPER_PATH = "audio/";
    private static final String SRC_FILE_NAME = "test_audio.mp3";
    private static final String CONVERTED_FILE_NAME = "test_audio.wav";

    @Test
    @DisplayName("오디오 저장 테스트")
    void saveFileTest() throws IOException {
        File file = new File("audio_from_react.mp3");
        byte[] bytes = Files.readAllBytes(file.toPath());
        AudioUtils.saveFile(bytes, UPPER_PATH + SRC_FILE_NAME);
    }

    @Test
    @DisplayName("길이 구하기 테스트")
    void getAudioLengthTest() {
        File file = new File(UPPER_PATH + SRC_FILE_NAME);
        int audioLength = AudioUtils.getAudioLength(file.getAbsolutePath());
        log.info("audio length = {}", audioLength);
    }
    
    @Test
    @DisplayName("오디오 변환 테스트")
    void convertAudioTest() {
        AudioUtils.convertAudio(UPPER_PATH + SRC_FILE_NAME, "wav");
    }
    
    @Test
    @DisplayName("오디오 재생 테스트")
    void playAudioTest() {
        AudioUtils.playAudio(UPPER_PATH + CONVERTED_FILE_NAME);
    }
}