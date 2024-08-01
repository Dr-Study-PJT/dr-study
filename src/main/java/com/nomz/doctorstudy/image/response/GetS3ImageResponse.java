package com.nomz.doctorstudy.image.response;

import jakarta.validation.constraints.NotBlank;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetS3ImageResponse {
    private String ImageUrl;
}
