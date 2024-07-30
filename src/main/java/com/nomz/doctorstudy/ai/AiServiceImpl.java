package com.nomz.doctorstudy.ai;

import com.nomz.doctorstudy.ai.request.AudioRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiServiceImpl implements AiService{

    @Override
    public void processAudioData(AudioRequest audioData, MultipartFile file) {
        // Log or print the JSON data received
        String transcribedText = audioData.getTranscribed_text();
        String fixedText = audioData.getFixed_text();
        int duration = audioData.getDuration();

        log.info("Transcribed text: {}", transcribedText);
        log.info("Fixed text: {}", fixedText);
        log.info("Duration: {} seconds", duration);

        // Log or print the file details
        log.info("Received file: {} with size {} bytes", file.getOriginalFilename(), file.getSize());

        // 파일 저장
        try {
            // 루트 디렉토리
            String rootPath = System.getProperty("user.dir");
            // Define the file path relative to the root directory
            String filePath = rootPath + "/uploaded_files/" + file.getOriginalFilename();
            file.transferTo(new File(filePath));
            log.info("File saved to: {}", filePath);
        } catch (Exception e) {
            log.error("Error saving file: {}", e.getMessage());
        }
    }
}
