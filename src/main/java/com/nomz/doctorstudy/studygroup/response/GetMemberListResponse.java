package com.nomz.doctorstudy.studygroup.response;

import com.nomz.doctorstudy.member.response.MemberInfo;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroup;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetMemberListResponse {
    @Schema(description = "스터디원 정보")
    private final MemberInfo memberInfo;

    @Schema(description = "스터디원 역할", example = "팀원")
    private String role;

    @Schema(description = "스터디원 가입 일시", example = "2024-07-31")
    private LocalDateTime joinDate;

    public static GetMemberListResponse of(MemberStudyGroup memberStudyGroup){
        return builder()
                .memberInfo(MemberInfo.of(memberStudyGroup.getMember()))
                .role(memberStudyGroup.getRole().toString())
                .joinDate(memberStudyGroup.getJoinDate())
                .build();
    }
}
