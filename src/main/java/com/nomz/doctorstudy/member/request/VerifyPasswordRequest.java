package com.nomz.doctorstudy.member.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VerifyPasswordRequest {

    private String password;
}
