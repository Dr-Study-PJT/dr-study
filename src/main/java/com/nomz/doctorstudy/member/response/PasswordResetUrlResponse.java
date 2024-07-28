package com.nomz.doctorstudy.member.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Builder
public class PasswordResetUrlResponse {
    private String url;
}
