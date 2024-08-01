package com.nomz.doctorstudy.image.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageUploadRequest {
    private MultipartFile file;

    @NotBlank(message = "이미지 타입을 선택해주세요")
    private String type;

}
