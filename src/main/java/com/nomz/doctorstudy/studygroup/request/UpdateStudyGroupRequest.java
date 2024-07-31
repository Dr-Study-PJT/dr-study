package com.nomz.doctorstudy.studygroup.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@RequiredArgsConstructor
@ToString
public class UpdateStudyGroupRequest {

    @NotNull(message = "스터디 그룹 이름은 반드시 포함되어야 합니다.")
    @Size(min = 1, max =32, message = "스터디 그룹 이름은 1자 이상 32자 이하여야 합니다.")
    @Schema(description = "스터디 그룹 이름", example = "정보처리기사 스터디")
    private final String name;

    private final Long captainId;

    private final Long imageId;

    private final String description;

}
