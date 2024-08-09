package com.nomz.doctorstudy.image.request;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageUploadRequest {
    private MultipartFile file;
    private String domain;
}
