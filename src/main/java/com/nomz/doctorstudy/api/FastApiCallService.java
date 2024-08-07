package com.nomz.doctorstudy.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

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
    public String gpt(String s) {
        String url = baseUrl + "/gpt/";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestJson =  "{\"text\":\"" + s + "\"}";
        HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);

        try{
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);
            String responseBody = response.getBody();
            if (responseBody != null) {
                JsonNode jsonNode = objectMapper.readTree(responseBody);
                return jsonNode.get("answer").asText();
            } else {
                return null;
            }
        } catch (ResourceAccessException e){
            System.err.println("ResourceAccessException: " + e.getMessage());
            return null;
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
            throw new RuntimeException(e);
        }

    }

    @Override
    public byte[] tts(String s) {
        String url = baseUrl + "/tts/";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestJson = "{\"text\":\"" + s + "\"}";
        HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);

        try{
            ResponseEntity<byte[]> response = restTemplate.exchange(url, HttpMethod.POST, entity, byte[].class);
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
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

            return response.getBody();
        }catch(ResourceAccessException e) {
            System.err.println("ResourceAccessException: " + e.getMessage());
            return null;
        }
    }
}
