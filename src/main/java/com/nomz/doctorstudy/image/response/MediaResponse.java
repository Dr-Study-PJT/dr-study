package com.nomz.doctorstudy.image.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MediaResponse implements FileResponse {
    private String mediaUrl;
}
