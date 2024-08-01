package com.nomz.doctorstudy.image.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetS3ImageRequest {
    @NotBlank(message = "가져올 이미지 id를 입력해주세요")
    private Long imageId;
}
