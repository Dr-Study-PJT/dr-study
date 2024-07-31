package com.nomz.doctorstudy.studygroup.request;

import com.nomz.doctorstudy.studygroup.entity.Tag;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@RequiredArgsConstructor
@ToString
public class CreateStudyGroupRequest {
    @NotNull(message = "스터디 그룹 이름은 반드시 포함되어야 합니다.")
    @Size(min = 1, max =32, message = "스터디 그룹 이름은 1자 이상 32자 이하여야 합니다.")
    @Schema(description = "스터디 그룹 이름", example = "정보처리기사 스터디")
    private final String name;

    @NotNull(message = "스터디 그룹 썸네일 이미지는 반드시 포함되어야 합니다.")
    @Schema(description = "스터디 그룹 썸네일 이미지", example = "11")
    private final Long imageId;

    @NotNull(message = "스터디 설명은 반드시 포함되어야 합니다.")
    @Size(min = 1, max =256, message = "스터디 설명은 1자 이상 256자 이하여야 합니다.")
    @Schema(description = "스터디 그룹 설명", example = "정보처리기사 합격을 위한 스터디입니다.")
    private final String description;

//    @NotNull(message = "스터디 목표는 반드시 포함되어야 합니다.")
//    @Size(min = 1, max =64, message = "스터디 목표는 1자 이상 64자 이하여야 합니다.")
//    @Schema(description = "스터디 그룹 목표", example = "정보처리기사 전원 합격")
//    private final String goal;

    @Schema(description = "스터디 종료 날짜", example = "2024-07-22")
    private final LocalDateTime dueDate;

    @NotNull(message = "스터디 인원은 반드시 포함되어야 합니다.")
    @Schema(description = "스터디 인원 수", example = "6")
    private final Integer memberCapacity;

    @Schema(description = "태그", example = "[\"#정처기\", \"#스터디\"]")
    private final List<String> tags;
}
