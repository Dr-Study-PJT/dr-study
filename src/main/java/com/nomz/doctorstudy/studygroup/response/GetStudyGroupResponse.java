package com.nomz.doctorstudy.studygroup.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@RequiredArgsConstructor
public class GetStudyGroupResponse {
    @Schema(description = "조회된 스터디그룹 아이디", example = "1")
    private final Long id;

    @Schema(description = "조회된 스터디그룹 이름", example = "정처기 스터디")
    private final String name;

    @Schema(description = "조회된 스터디그룹 썸네일 이미지 아이디", example = "1")
    private final Long imageId;

    @Schema(description = "조회된 스터디그룹 생성 일시", example = "2024-07-22")
    private final LocalDateTime createdAt;

    @Schema(description = "조회된 스터디그룹 삭제 여부", example = "False")
    private final Boolean isDeleted;

    @Schema(description = "조회된 스터디그룹 설명란", example = "정처기 합격을 위한 스터디입니다.")
    private final String description;

    @Schema(description = "조회된 스터디그룹 종료일자", example = "2024-08-16")
    private final LocalDate dueDate;

    @Schema(description = "조회된 스터디그룹 그룹장 아이디", example = "1")
    private final Long captainId;

    @Schema(description = "조회된 스터디그룹 현재 인원 수", example = "1")
    private final Integer memberCount;

    @Schema(description = "조회된 스터디그룹 최대 인원", example = "6")
    private final Integer memberCapacity;

    @Schema(description = "태그 리스트", example = "[#정처기, #토익]")
    private final List<String> tags;
}
