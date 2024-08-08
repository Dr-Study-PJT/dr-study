package com.nomz.doctorstudy.image.request;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SaveS3MediaRequest {
    private MultipartFile file;
    private String filePath;
    private String conferenceId;
}
