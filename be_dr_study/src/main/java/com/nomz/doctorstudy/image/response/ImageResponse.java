package com.nomz.doctorstudy.image.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ImageResponse{
    private Long imageId;
    private String imageUrl;
}
