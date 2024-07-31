package com.nomz.doctorstudy.conference.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetConferenceListRequest {
    private String title;
    private Integer memberCapacity;
}
