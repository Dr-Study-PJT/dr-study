package com.nomz.doctorstudy.image.service;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.io.File;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Slf4j
@ActiveProfiles("local")
class MediaServiceTest {
    @Autowired
    private MediaService mediaService;


    @Test
    void saveImg() {
    }

    @Test
    void saveAudio() {
        File file = new File("C:\\Users\\장철현\\Downloads\\녹음.mp3");
        log.info("file = {}", file);
        String url = mediaService.saveAudio(file);
        log.info("url = {}", url);

    }
}