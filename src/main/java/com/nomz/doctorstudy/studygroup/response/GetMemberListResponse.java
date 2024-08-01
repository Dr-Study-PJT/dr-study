package com.nomz.doctorstudy.studygroup.response;

import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroup;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetMemberListResponse {

    @Schema(description = "스터디원 아이디", example = "1")
    private final Long id;

    @Schema(description = "스터디원 닉네임", example = "박경모")
    private final String nickname;

    @Schema(description = "스터디원 썸네일 이미지 아이디", example = "1")
    private Long imageId;

    @Schema(description = "스터디원 역할", example = "팀원")
    private String role;

    @Schema(description = "스터디원 가입 일시", example = "2024-07-31")
    private LocalDateTime joinDate;

    public static GetMemberListResponse of(MemberStudyGroup memberStudyGroup){
        return builder()
                .id(memberStudyGroup.getMember().getId())
                .nickname(memberStudyGroup.getMember().getNickname())
                .imageId(memberStudyGroup.getMember().getImageId())
                .role(memberStudyGroup.getRole())
                .joinDate(memberStudyGroup.getJoinDate())
                .build();
    }
}
