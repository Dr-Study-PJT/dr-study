package com.nomz.doctorstudy.studygroup.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

@Getter
@RequiredArgsConstructor
@ToString
public class CreateApplyResponse {

    @Schema(description = "생성된 지원 아이디", example = "1")
    private final Long MemberStudyGroupApplyId;
}
