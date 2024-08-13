package com.nomz.doctorstudy.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
public class FastApiCallService implements ExternalApiCallService{

    @Value("${fast-api.url}")
    private String baseUrl;
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    private RestTemplate restTemplate;

    public FastApiCallService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @PostConstruct
    public void printLogBaseUrl() {
        log.info("----------FastAPI URL={}----------", baseUrl);
    }

    @Override
    public String gpt(String content) {
        String url = baseUrl + "/gpt/";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(content, headers);

        try{
            log.debug("sent gpt request to FastAPI server, url={}", url);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
            log.debug("received gpt response from FastAPI server, response={}", response);
            return response.getBody();
        } catch (ResourceAccessException e){
            System.err.println("ResourceAccessException: " + e.getMessage());
            return null;
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
            throw new RuntimeException(e);
        }

    }

    @Override
    public byte[] tts(String content, VoiceType type) {
        String url = baseUrl + "/tts/";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Voice-Type", type.getToken());

        HttpEntity<String> entity = new HttpEntity<>(content, headers);

        try{
            log.debug("sent tts request to FastAPI server, url={}", url);
            ResponseEntity<byte[]> response = restTemplate.exchange(url, HttpMethod.POST, entity, byte[].class);
            log.debug("received tts response from FastAPI server, response={}", response);
            return response.getBody();
        }catch (ResourceAccessException e) {
            System.err.println("ResourceAccessException: " + e.getMessage());
            return null;
        }
    }

    @Override
    public String stt(byte[] audio) {
        String url = baseUrl + "/stt/";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);

        HttpEntity<byte[]> entity = new HttpEntity<>(audio, headers);

        try{
            log.debug("sent stt request to FastAPI server, url={}", url);
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
            log.debug("received stt response from FastAPI server, response={}", response);

            return response.getBody();
        }catch(ResourceAccessException e) {
            System.err.println("ResourceAccessException: " + e.getMessage());
            return null;
        }
    }
}
