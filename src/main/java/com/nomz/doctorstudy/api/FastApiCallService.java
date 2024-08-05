package com.nomz.doctorstudy.api;

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

    @Autowired
    private RestTemplate restTemplate;

    public FastApiCallService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
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
            return response.getBody();
        } catch (ResourceAccessException e){
            System.err.println("ResourceAccessException: " + e.getMessage());
            return null;
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
