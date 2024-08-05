package com.nomz.doctorstudy.studygroup.response;

import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroup;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class GetMemberListResponse {

    @Schema(description = "스터디원 아이디", example = "1")
    private Long id;

    @Schema(description = "스터디원 이메일", example = "km@gmail.com")
    private String email;

    @Schema(description = "스터디원 닉네임", example = "박경모")
    private String nickname;

    @Schema(description = "스터디원 가입일자(회원가입일자)", example = "2024-08-05")
    private LocalDate regDate;

    @Schema(description = "스터디원 썸네일 이미지 아이디", example = "1")
    private Long imageId;

    @Schema(description = "스터디원 역할", example = "팀원")
    private String role;

    @Schema(description = "스터디원 가입 일시", example = "2024-07-31")
    private LocalDateTime joinDate;

    public static GetMemberListResponse of(MemberStudyGroup memberStudyGroup){
        return builder()
                .id(memberStudyGroup.getMember().getId())
                .email(memberStudyGroup.getMember().getEmail())
                .nickname(memberStudyGroup.getMember().getNickname())
                .regDate(memberStudyGroup.getMember().getRegDate().toLocalDate())
                .imageId(memberStudyGroup.getMember().getImageId())
                .role(memberStudyGroup.getRole())
                .joinDate(memberStudyGroup.getJoinDate())
                .build();
    }
}
