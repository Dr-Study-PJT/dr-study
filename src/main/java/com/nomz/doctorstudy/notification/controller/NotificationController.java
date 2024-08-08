package com.nomz.doctorstudy.notification.controller;

import com.nomz.doctorstudy.common.dto.ErrorResponse;
import com.nomz.doctorstudy.common.dto.SuccessResponse;
import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.common.exception.CommonErrorCode;
import com.nomz.doctorstudy.conference.dto.ConferenceMemberInviteSearchFilter;
import com.nomz.doctorstudy.conference.entity.ConferenceMemberInvite;
import com.nomz.doctorstudy.conference.repository.ConferenceMemberInviteQueryRepository;
import com.nomz.doctorstudy.member.Login;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.notification.response.NotificationInfo;
import com.nomz.doctorstudy.notification.NotificationItemType;
import com.nomz.doctorstudy.notification.NotificationService;
import com.nomz.doctorstudy.notification.entity.Notification;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupApply;
import com.nomz.doctorstudy.studygroup.exception.StudyGroupErrorCode;
import com.nomz.doctorstudy.studygroup.exception.StudyGroupException;
import com.nomz.doctorstudy.studygroup.repository.MemberStudyGroupApplyRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/notifications")
@Tag(name = "Notification API", description = "Notification API 입니다.")
public class NotificationController {
    private final NotificationService notificationService;
    private final MemberStudyGroupApplyRepository memberStudyGroupApplyRepository;
    private final ConferenceMemberInviteQueryRepository conferenceMemberInviteQueryRepository;

    @GetMapping
    @Operation(summary = "Notification 리스트 조회", description = "Notification 리스트를 검색합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Notification 리스트 검색 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Notification 리스트 검색 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "Notification 조회에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """))),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "인증에 실패했습니다.",
                        "errors": { }
                    }
                    """)))
    })
    public ResponseEntity<SuccessResponse<List<NotificationInfo>>> getNotifications(
            @Parameter(hidden = true) @Login Member requester
    ) {
        List<NotificationInfo> responses = new ArrayList<>();
        List<Notification> notifications = notificationService.getUnreadNotifications(requester);

        for (Notification notification : notifications) {
            if (notification.getItemType() == NotificationItemType.STUDY_GROUP_APPLICATION) {
                MemberStudyGroupApply application = memberStudyGroupApplyRepository.findByMemberIdAndStudyGroupId(requester.getId(), notification.getItemId())
                        .orElseThrow(() -> new StudyGroupException(StudyGroupErrorCode.APPLY_NOT_FOUND_ERROR));
                responses.add(NotificationInfo.of(application));
                // TODO: 지원 상태 체크, 알림 requester는 가입신청인이 아님, 컨퍼런스 초대 아이디 넣는것 고려해보기
            }
            if (notification.getItemType() == NotificationItemType.CONFERENCE_INVITATION) {
                List<ConferenceMemberInvite> invitations = conferenceMemberInviteQueryRepository.getConferenceMemberInviteList(
                        ConferenceMemberInviteSearchFilter.builder().
                                inviteeId(requester.getId()).
                                conferenceId(notification.getId()).
                                build()
                );
                if (invitations.size() != 1) {
                    throw new BusinessException(CommonErrorCode.INTERNAL_SERVER_ERROR, "컨퍼런스 초대 알림 조회 중, 알 수 없는 오류가 발생했습니다.");
                }
                responses.add(NotificationInfo.of(invitations.get(0)));
            }
        }

        return ResponseEntity.ok(new SuccessResponse<>(
                "Notification List 조회에 성공했습니다.",
                responses
        ));
    }


    @PostMapping("/{notificationId}/read")
    @Operation(summary = "Notification 리스트 조회", description = "Notification 리스트를 검색합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Notification 리스트 검색 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Notification 리스트 검색 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "Notification 조회에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """))),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "인증에 실패했습니다.",
                        "errors": { }
                    }
                    """))),
            @ApiResponse(responseCode = "403", description = "권한 없음", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "권한이 없습니다.",
                        "errors": { }
                    }
                    """)))
    })
    public ResponseEntity<SuccessResponse<?>> readNotification(
            @Parameter(hidden = true) @Login Member requester,
            @PathVariable("notificationId") Long notificationId
    ) {
        notificationService.readNotification(requester, notificationId);

        return ResponseEntity.ok(new SuccessResponse<>(
                    "알림 읽기에 성공했습니다.",
                null
                )
        );
    }
}
