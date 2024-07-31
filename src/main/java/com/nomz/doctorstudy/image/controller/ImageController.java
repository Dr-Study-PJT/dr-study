package com.nomz.doctorstudy.image.controller;

import com.nomz.doctorstudy.common.dto.SuccessResponse;
import com.nomz.doctorstudy.image.repository.ImageRepository;
import com.nomz.doctorstudy.image.request.ImageUploadRequest;
import com.nomz.doctorstudy.image.service.ImageService;
import jakarta.mail.Multipart;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/v1/images")
@Slf4j
@RequiredArgsConstructor
public class ImageController {
    private final ImageService imageService;


    @PostMapping()
    public ResponseEntity<SuccessResponse<?>> saveImg(@Valid @RequestBody ImageUploadRequest imageUploadRequest){
        log.info("imageUploadRequest.getFile() = {}", imageUploadRequest.getFile());
        log.info("imageUploadRequest.getType() = {}", imageUploadRequest.getType());

        String saveUrl = imageService.save(imageUploadRequest);

        return ResponseEntity.ok(
                new SuccessResponse<>("이미지 업로드에 성공했습니다.", saveUrl)
        );
    }

}
