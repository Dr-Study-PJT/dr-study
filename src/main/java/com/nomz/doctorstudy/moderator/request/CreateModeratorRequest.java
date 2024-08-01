package com.nomz.doctorstudy.moderator.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateModeratorRequest {
    private String name;

    private String voiceType;

    private String characterType;

    private String modelType;

    private String prePrompt;

    private String script;

    private String description;
}
