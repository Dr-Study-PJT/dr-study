package com.nomz.doctorstudy.member.request;

import com.nomz.doctorstudy.image.entity.Image;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdatedMemberInfoRequest {
    private String password;
    private String nickname;
    private Image image;
}
