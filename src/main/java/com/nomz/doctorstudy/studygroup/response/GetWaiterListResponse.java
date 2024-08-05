package com.nomz.doctorstudy.studygroup.response;

import com.nomz.doctorstudy.member.response.MemberResponse;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupApply;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GetWaiterListResponse {
    @Schema(description = "신청 대기자")
    private final MemberResponse memberResponse;

    @Schema(description = "그룹 아이디", example = "1")
    private final Long groupId;

    @Schema(description = "그룹 이름", example = "정처기 스터디")
    private final String groupName;

    @Schema(description = "그룹 가입 지원 시각", example = "2024-07-31")
    private LocalDateTime createdAt;

    @Schema(description = "그룹 가입 메시지", example = "가입 신청합니다.")
    private String message;

    public static GetWaiterListResponse of(MemberStudyGroupApply memberStudyGroupApply) {
        return builder()
                .memberResponse(MemberResponse.of(memberStudyGroupApply.getMember()))
                .groupId(memberStudyGroupApply.getStudyGroup().getId())
                .groupName(memberStudyGroupApply.getStudyGroup().getName())
                .createdAt(memberStudyGroupApply.getCreatedAt())
                .message(memberStudyGroupApply.getMessage())
                .build();
    }
}
