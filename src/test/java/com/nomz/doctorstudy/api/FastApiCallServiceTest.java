package com.nomz.doctorstudy.api;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class FastApiCallServiceTest {

    private RestTemplate restTemplate;
    private FastApiCallService fastApiCallService;

    @BeforeEach
    public void setUp() {
        restTemplate = new RestTemplate();
        fastApiCallService = new FastApiCallService(restTemplate);
    }

    @Test
    public void testGpt() {
        String inputText = "인공지능이 뭐야?";
        String actualResponse = fastApiCallService.gpt(inputText);
        System.out.println("Actual Response: " + actualResponse);
    }

    @Test
    public void testTts() {
        String inputText = "안녕하세요. 오늘 저는 데이터베이스에 대해 이야기할 것입니다. " +
                "데이터베이스는 다양한 정보를 체계적으로 저장하고 효율적으로 관리할 수 있는 시스템을 말합니다. " +
                "대량의 데이터를 정확하게 저장하고 분석할 수 있도록 도와줍니다.";
        byte[] actualResponse = fastApiCallService.tts(inputText);
        System.out.println("Actual Response: " + Arrays.toString(actualResponse));

    }

    @Test
    public void testStt() {
        String inputText = "안녕하세요. 오늘 저는 데이터 베이스. 그래서 드디어 대해 갖다니뚜게 드리겠습니다. " +
                "하이서베이크와 웨이터를 체계적으로 소장하고 분명한 시스템을 의미합니다. " +
                "데이터 베이스는 대량의 데이터를 효율적으로 소장 전세X정 숙제할 수 있도록 구워줍니다.";

        // 텍스트를 음성 파일로 변환
        byte[] audioData = fastApiCallService.tts(inputText);

        // 음성 데이터가 null이 아니고 길이가 0보다 큰지 확인
        assertNotNull(audioData, "Audio data should not be null");
        assertTrue(audioData.length > 0, "Audio data length should be greater than 0");

        // 음성 파일을 텍스트로 변환
        String transcribedText = fastApiCallService.stt(audioData);

        // 변환된 텍스트가 null이 아니고, 길이가 0보다 큰지 확인
        assertNotNull(transcribedText, "Transcribed text should not be null");
        assertTrue(transcribedText.length() > 0, "Transcribed text length should be greater than 0");

        // 결과 출력
        System.out.println(transcribedText);
    }
}


//
//    @Test
//    public void testStt() {
//        Byte[] audioData = new Byte[]{1, 2, 3, 4};
//        byte[] byteArray = toPrimitives(audioData);
//        String expectedResponse = "{\"transcribed_text\":\"transcribed text\"}";
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
//        HttpEntity<byte[]> request = new HttpEntity<>(byteArray, headers);
//
//        when(restTemplate.exchange(
//                eq("http://localhost:6080/stt"),
//                eq(HttpMethod.POST),
//                any(HttpEntity.class),
//                eq(String.class)
//        )).thenReturn(new ResponseEntity<>(expectedResponse, HttpStatus.OK));
//
//        String actualResponse = fastApiCallService.stt(audioData);
//        assertEquals(expectedResponse, actualResponse);
//    }
//
//    private Byte[] toObjects(byte[] bytesPrim) {
//        Byte[] bytesObj = new Byte[bytesPrim.length];
//        for (int i = 0; i < bytesPrim.length; i++) {
//            bytesObj[i] = bytesPrim[i];
//        }
//        return bytesObj;
//    }
//
//    private byte[] toPrimitives(Byte[] bytesObj) {
//        byte[] bytesPrim = new byte[bytesObj.length];
//        for (int i = 0; i < bytesObj.length; i++) {
//            bytesPrim[i] = bytesObj[i];
//        }
//        return bytesPrim;
//    }
