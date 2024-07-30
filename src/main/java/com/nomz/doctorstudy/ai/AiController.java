package com.nomz.doctorstudy.ai;

import com.nomz.doctorstudy.ai.request.AudioRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Tag(name ="AI API", description = "AI API 입니다.")
public class AiController {

    private final AiService aiService;

    @Autowired
    private RestTemplate restTemplate;

    private final String pythonServerUrl = "http://localhost:6080/receive-text";


    @PostMapping("/receive-audio")
    public ResponseEntity<String> receiveAudio(
            @RequestPart("json_data") AudioRequest audioData,
            @RequestPart("file") MultipartFile file) {

        // 서비스 클래스 호출
        aiService.processAudioData(audioData, file);

        // Return a success message
        return ResponseEntity.ok("JSON and file received successfully");
    }

    @PostMapping("/send-to-gpt")
    @Operation(summary = "Gpt로 텍스트 전송", description = "Study Group 정보를 조회합니다.")
    public ResponseEntity<String> sendText(){
        // Prepare the text data to send
        String textToSend = "This is the text to be processed by the Python server.";

        // Create headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Create a map for the JSON data
        Map<String, String> jsonData = new HashMap<>();
        jsonData.put("text", textToSend);

        // Create the request entity
        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(jsonData, headers);

        // Send the POST request to the Python server
        ResponseEntity<String> response = restTemplate.postForEntity(pythonServerUrl, requestEntity, String.class);

        // Return the response from the Python server
        return ResponseEntity.ok(response.getBody());
    }



}