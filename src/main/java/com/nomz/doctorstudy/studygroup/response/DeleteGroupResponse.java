package com.nomz.doctorstudy.studygroup.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DeleteGroupResponse {
    @Schema(description = "삭제한 그룹 아이디", example = "1")
    private final Long groupId;

}
