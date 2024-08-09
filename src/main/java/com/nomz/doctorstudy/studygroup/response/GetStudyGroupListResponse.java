package com.nomz.doctorstudy.studygroup.response;

import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class GetStudyGroupListResponse {
    @Schema(description = "조회된 스터디그룹 아이디", example = "1")
    private final Long id;

    @Schema(description = "조회된 스터디그룹 이름", example = "정처기 스터디")
    private final String name;

    @Schema(description = "조회된 스터디그룹 썸네일 이미지 Url", example = "xxx.xxx.xxx")
    private final String imageUrl;

    @Schema(description = "조회된 스터디그룹 생성 일시", example = "2024-07-22")
    private final LocalDateTime createdAt;

    @Schema(description = "조회된 스터디그룹 삭제 여부", example = "False")
    private final Boolean isDeleted;

    @Schema(description = "조회된 스터디그룹 설명란", example = "정처기 합격을 위한 스터디입니다.")
    private final String description;

    @Schema(description = "조회된 스터디그룹 태그", example = "[\"#정처기\", \"#스터디\"]")
    private final List<String> tags;

    @Schema(description = "조회된 스터디그룹 종료일자", example = "2024-08-16")
    private final LocalDate dueDate;

    @Schema(description = "조회된 스터디그룹 그룹장 아이디", example = "1")
    private final Long captainId;

    @Schema(description = "조회된 스터디그룹 최대 인원", example = "6")
    private final Integer memberCapacity;

    public static GetStudyGroupListResponse of(StudyGroup studyGroup){
        List<String> tagNames = studyGroup.getStudyGroupTags().stream()
                .map(studyGroupTag -> studyGroupTag.getTag().getName())
                .collect(Collectors.toList());

        return builder()
                .id(studyGroup.getId())
                .name(studyGroup.getName())
                .imageUrl(studyGroup.getImage().getImageUrl())
                .createdAt(studyGroup.getCreatedAt())
                .isDeleted(studyGroup.getIsDeleted())
                .description(studyGroup.getDescription())
                .tags(tagNames)
                .dueDate(studyGroup.getDueDate())
                .captainId(studyGroup.getCaptain().getId())
                .memberCapacity(studyGroup.getMemberCapacity())
                .build();
    }
}
