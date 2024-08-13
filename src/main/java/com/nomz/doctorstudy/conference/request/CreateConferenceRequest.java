package com.nomz.doctorstudy.conference.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateConferenceRequest {
    @Schema(description = "사회자 아이디", example = "1")
    private Long moderatorId;

    @NotNull(message = "스터디 그룹 아이디는 반드시 포함되어야 합니다.")
    @Schema(description = "스터디 그룹 아이디", example = "1")
    private Long studyGroupId;

    @Schema(description = "이미지 아이디", example = "1")
    private Long imageId;

    @NotBlank(message = "컨퍼런스 제목은 반드시 포함되어야 합니다.")
    @Size(min = 1, max = 64, message = "컨퍼런스 제목은 1자이상 64자 이하여야 합니다.")
    @Schema(description = "컨퍼런스 제목", example = "정보처리기사 컨퍼런스")
    private String title;

    @NotBlank(message = "컨퍼런스 주제는 반드시 포함되어야 합니다.")
    @Size(min = 1, max = 64, message = "컨퍼런스 주제는 1자이상 64자 이하여야 합니다.")
    @Schema(description = "컨퍼런스 주제", example = "정보처리기사")
    private String subject;

    @NotNull(message = "최대 인원수는 반드시 포함되어야 합니다.")
    @Min(value = 1, message = "최대 인원수의 최솟값은 1입니다.")
    @Max(value = 256, message = "최대 인원수의 최댓값은 256입니다.")
    @Schema(description = "최대 인원수", example = "10")
    private Integer memberCapacity;

    @NotNull(message = "예정일은 반드시 포함되어야 합니다.")
    @Schema(description = "예정일", example = "2024-08-010T22:20:42.483173")
    private LocalDateTime scheduledTime;
}
