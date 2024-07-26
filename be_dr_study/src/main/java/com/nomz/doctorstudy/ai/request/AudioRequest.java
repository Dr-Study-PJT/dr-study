package com.nomz.doctorstudy.ai.request;

import lombok.Data;

@Data
public class AudioRequest {
    private String transcribed_text;
    private String fixed_text;
    private Integer duration;
}
