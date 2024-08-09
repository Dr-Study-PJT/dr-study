package com.nomz.doctorstudy.studygroup.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetStudyGroupListRequest {
    private Long memberId;
    private String name;
    private Integer memberCapacity;
    private String tagName;
}
