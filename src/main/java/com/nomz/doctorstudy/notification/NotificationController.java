package com.nomz.doctorstudy.notification;

import com.nomz.doctorstudy.common.auth.MemberDetails;
import com.nomz.doctorstudy.common.dto.ErrorResponse;
import com.nomz.doctorstudy.common.dto.SuccessResponse;
import com.nomz.doctorstudy.conference.entity.ConferenceMemberInvite;
import com.nomz.doctorstudy.conference.request.GetConferenceListRequest;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupApply;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Stream;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/notifications")
@Tag(name = "Notification API", description = "Notification API 입니다.")
public class NotificationController {
    private final NotificationService notificationService;

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
    public ResponseEntity<SuccessResponse<List<GetNotificationResponse>>> getNotifications() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        Member requester = memberDetails.getUser();

        List<MemberStudyGroupApply> applications = notificationService.getStudyGroupApplyNotifications(requester);
        List<ConferenceMemberInvite> invitations = notificationService.getConferenceInviteNotifications(requester);

        List<GetNotificationResponse> responses = Stream.concat(
                        applications.stream().map(GetNotificationResponse::of),
                        invitations.stream().map(GetNotificationResponse::of)
                )
                .sorted((o1, o2) -> {
                    if (o1.getCreatedAt().isBefore(o2.getCreatedAt())) {
                        return -1;
                    }
                    if (o1.getCreatedAt().isAfter(o2.getCreatedAt())) {
                        return 1;
                    }
                    return 0;
                })
                .toList();

        return ResponseEntity.ok(new SuccessResponse<>(
                "Notification List 조회에 성공했습니다.",
                responses
        ));
    }
}
