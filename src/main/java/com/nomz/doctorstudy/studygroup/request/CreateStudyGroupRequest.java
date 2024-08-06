package com.nomz.doctorstudy.studygroup.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class CreateStudyGroupRequest {
    @NotNull(message = "스터디 그룹 이름은 반드시 포함되어야 합니다.")
    @Size(min = 1, max =32, message = "스터디 그룹 이름은 1자 이상 32자 이하여야 합니다.")
    @Schema(description = "스터디 그룹 이름", example = "정보처리기사 스터디")
    private String name;

    @Schema(description = "스터디 그룹 썸네일 이미지", example = "1")
    private Long imageId;

    @NotNull(message = "스터디 설명은 반드시 포함되어야 합니다.")
    @Size(min = 1, max =256, message = "스터디 설명은 1자 이상 256자 이하여야 합니다.")
    @Schema(description = "스터디 그룹 설명", example = "정보처리기사 합격을 위한 스터디입니다.")
    private String description;

    @Schema(description = "스터디 종료 날짜", example = "2024-07-22")
    private LocalDate dueDate;

    @NotNull(message = "스터디 인원은 반드시 포함되어야 합니다.")
    @Schema(description = "스터디 인원 수", example = "6")
    private Integer memberCapacity;

    @Schema(description = "태그", example = "[\"#정처기\", \"#스터디\"]")
    private List<String> tags;
}
