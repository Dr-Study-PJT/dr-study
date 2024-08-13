package com.nomz.doctorstudy.studygroup.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UpdateStudyGroupRequest {

    @Schema(description = "새로운 스터디 그룹 이름", example = "NEW 정보처리기사 스터디")
    private String name;

    @Schema(description = "새로운 스터디 그룹장 ID", example = "1")
    private Long captainId;

    @Schema(description = "새로운 스터디 이미지 ID", example = "1")
    private Long imageId;

    @Schema(description = "새로운 스터디 그룹 설명", example = "NEW 설명입니다.")
    private String description;

}
