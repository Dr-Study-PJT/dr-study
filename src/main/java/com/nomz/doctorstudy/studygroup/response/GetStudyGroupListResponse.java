package com.nomz.doctorstudy.studygroup.response;

import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

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

    @Schema(description = "조회된 스터디그룹 썸네일 이미지 아이디", example = "1")
    private final Long imageId;

    @Schema(description = "조회된 스터디그룹 생성 일시", example = "2024-07-22")
    private final LocalDateTime createdAt;

    @Schema(description = "조회된 스터디그룹 삭제 여부", example = "False")
    private final Boolean isDeleted;

    @Schema(description = "조회된 스터디그룹 설명란", example = "정처기 합격을 위한 스터디입니다.")
    private final String description;

    @Schema(description = "조회된 스터디그룹 태그", example = "#정처기")
    private final List<String> tags;

    //@Schema(description = "조회된 스터디그룹 아이디", example = "1")
    //private final Long captainId;

    @Schema(description = "조회된 스터디그룹 현재 인원 수", example = "1")
    private final Integer memberCount;

    @Schema(description = "조회된 스터디그룹 최대 인원", example = "6")
    private final Integer memberCapacity;

    public static GetStudyGroupListResponse of(StudyGroup studyGroup){
        List<String> tagNames = studyGroup.getStudyGroupTags().stream()
                .map(studyGroupTag -> studyGroupTag.getTag().getName())
                .collect(Collectors.toList());

        return builder()
                .id(studyGroup.getId())
                .name(studyGroup.getName())
                .imageId(studyGroup.getImageId())
                .createdAt(studyGroup.getCreatedAt())
                .isDeleted(studyGroup.getIsDeleted())
                .description(studyGroup.getDescription())
                .tags(tagNames)
                .memberCount(studyGroup.getMemberCount())
                .memberCapacity(studyGroup.getMemberCapacity())
                .build();
    }
}
