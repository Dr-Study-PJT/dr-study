package com.nomz.doctorstudy.conference;

import com.nomz.doctorstudy.common.auth.MemberDetails;
import com.nomz.doctorstudy.common.dto.SuccessResponse;
import com.nomz.doctorstudy.common.dto.ErrorResponse;
import com.nomz.doctorstudy.conference.entity.Conference;
import com.nomz.doctorstudy.conference.request.CreateConferenceRequest;
import com.nomz.doctorstudy.conference.request.GetConferenceListRequest;
import com.nomz.doctorstudy.conference.request.InviteMemberConferenceRequest;
import com.nomz.doctorstudy.conference.request.JoinConferenceRequest;
import com.nomz.doctorstudy.conference.response.*;
import com.nomz.doctorstudy.conference.service.ConferenceService;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.response.MemberResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Validated
@RestController
@RequestMapping("/v1/conferences")
@RequiredArgsConstructor
@Tag(name = "Conference API", description = "Conference API 입니다.")
public class ConferenceController {
    private final ConferenceService conferenceService;

    @PostMapping
    @Operation(summary = "Conference 생성", description = "Conference를 생성합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Conference 생성 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "유효하지 않은 입력", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "유효하지 않은 입력입니다.",
                        "errors": {
                            "title": "제목은 1자이상 64자 이하여야 합니다.",
                            "thumbnailImageId": "썸네일 이미지 아이디는 반드시 포함되어야 합니다."
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
    public ResponseEntity<SuccessResponse<CreateConferenceResponse>> createConference(
            Authentication authentication,
            @Valid @RequestBody CreateConferenceRequest request
    ) {
        Member member = ((MemberDetails) authentication.getPrincipal()).getUser();
        Long conferenceId = conferenceService.createConference(member, request);
        CreateConferenceResponse response = CreateConferenceResponse.builder()
                .conferenceId(conferenceId)
                .build();

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Conference 생성에 성공했습니다.",
                        response
                )
        );
    }


    @GetMapping("/{conferenceId}")
    @Operation(summary = "Conference 조회", description = "Conference 정보를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Conference 조회 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "404", description = "Conference 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "Conference 조회에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """)))
    })
    public ResponseEntity<SuccessResponse<GetConferenceResponse>> getConference(
            @PathVariable("conferenceId") Long conferenceId) {
        Conference conference = conferenceService.getConference(conferenceId);

        GetConferenceResponse response = GetConferenceResponse.builder()
                .id(conference.getId())
                .title(conference.getTitle())
                .memberCapacity(conference.getMemberCapacity())
                .build();

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Conference 조회에 성공했습니다.",
                        response
                )
        );
    }


    @GetMapping
    @Operation(summary = "Conference 리스트 조회", description = "Conference 리스트를 검색합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Conference 리스트 검색 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Conference 리스트 검색 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "Conference 조회에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """)))
    })
    public ResponseEntity<SuccessResponse<List<GetConferenceListResponseItem>>> getConferenceList(
            @ParameterObject @ModelAttribute GetConferenceListRequest request
    ) {
        // TODO: 조인으로 성능 최적화 필요
        List<GetConferenceListResponseItem> responses = conferenceService.getConferenceList(request).stream()
                .map(GetConferenceListResponseItem::of)
                .toList();

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Conference 리스트 조회에 성공했습니다.",
                        responses
                )
        );
    }


    @PostMapping("/{conference_id}/open")
    @Operation(summary = "Conference 개최", description = "Conference를 개최합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Conference 개최 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "인증에 실패했습니다.",
                        "errors": { }
                    }
                    """))),
            @ApiResponse(responseCode = "403", description = "권한 없음", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "권한이 없습니다. 호스트 유저만이 개최할 수 있습니다.",
                        "errors": { }
                    }
                    """))),
            @ApiResponse(responseCode = "404", description = "Conference 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "존재하지 않는 Conference입니다.",
                        "errors": { }
                    }
                    """))),
    })
    public ResponseEntity<SuccessResponse<?>> openConference(
            @PathVariable("conference_id") Long conferenceId
    ) {
        conferenceService.openConference(conferenceId);

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Conference 개최에 성공했습니다.",
                        null
                )
        );
    }


    @PostMapping("/{conference_id}/start")
    @Operation(summary = "Conference 시작", description = "Conference를 시작합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Conference 시작 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "인증에 실패했습니다.",
                        "errors": { }
                    }
                    """))),
            @ApiResponse(responseCode = "403", description = "권한 없음", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "권한이 없습니다. 호스트 유저만이 시작시킬 수 있습니다.",
                        "errors": { }
                    }
                    """))),
            @ApiResponse(responseCode = "404", description = "Conference 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "존재하지 않는 Conference입니다.",
                        "errors": { }
                    }
                    """))),
    })
    public ResponseEntity<SuccessResponse<?>> startConference(
            @PathVariable("conference_id") Long conferenceId
    ) {
        conferenceService.startConference(conferenceId);

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Conference 시작에 성곻했습니다.",
                        null
                )
        );
    }


    @PostMapping("/{conference_id}/finish")
    @Operation(summary = "Conference 종료", description = "Conference를 종료합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Conference 종료 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "인증에 실패했습니다.",
                        "errors": { }
                    }
                    """))),
            @ApiResponse(responseCode = "403", description = "권한 없음", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "권한이 없습니다. 호스트 유저만이 종료시킬 수 있습니다.",
                        "errors": { }
                    }
                    """))),
            @ApiResponse(responseCode = "404", description = "Conference 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "존재하지 않는 Conference입니다.",
                        "errors": { }
                    }
                    """))),
    })
    public ResponseEntity<SuccessResponse<?>> finishConference(
            @PathVariable("conference_id") Long conferenceId
    ) {
        conferenceService.finishConference(conferenceId);

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Conference 종료에 성공했습니다.",
                        null
                )
        );
    }


    @PostMapping("/{conferenceId}/join")
    @Operation(summary = "Conference 참여", description = "Conference에 참여합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Conference 참여 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "인증에 실패했습니다.",
                        "errors": { }
                    }
                    """))),
            @ApiResponse(responseCode = "403", description = "권한 없음", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "권한이 없습니다. 초대받은 유저만이 참여할 수 있습니다.",
                        "errors": { }
                    }
                    """))),
            @ApiResponse(responseCode = "404", description = "Conference 참여 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "존재하지 않는 Conference입니다.",
                        "errors": { }
                    }
                    """))),
    })
    public ResponseEntity<SuccessResponse<List<String>>> joinConference(
            @PathVariable("conferenceId") Long conferenceId,
            Authentication authentication,
            @RequestBody JoinConferenceRequest request
            ) {
        Member requester = ((MemberDetails) authentication.getPrincipal()).getUser();

        List<String> existingParticipants = conferenceService.joinConference(requester, conferenceId, request);

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Conference 참여에 성공했습니다.",
                        existingParticipants
                )
        );
    }

    
    @PostMapping("/{conferenceId}/invite")
    @Operation(summary = "Conference 멤버 초대", description = "Conference에 멤버를 초대합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Conference 멤버 초대 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "인증에 실패했습니다.",
                        "errors": { }
                    }
                    """))),
            @ApiResponse(responseCode = "403", description = "권한 없음", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "권한이 없습니다. Conference 방장만이 초대할 수 있습니다.",
                        "errors": { }
                    }
                    """))),
            @ApiResponse(responseCode = "404", description = "Conference 참여 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "존재하지 않는 Conference입니다.",
                        "errors": { }
                    }
                    """))),
    })
    public ResponseEntity<SuccessResponse<?>> inviteMemberConference(
            @PathVariable Long conferenceId,
            @RequestBody InviteMemberConferenceRequest request
    ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        Member requester = memberDetails.getUser();

        conferenceService.inviteMemberConference(requester, conferenceId, request);

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Conference 멤버 초대에 성공했습니다.",
                        null
                )
        );
    }


    @GetMapping("/{conferenceId}/participants")
    public ResponseEntity<SuccessResponse<List<MemberResponse>>> getConferenceParticipantsList(
            @PathVariable("conferenceId") Long conferenceId
    ) {
        List<MemberResponse> responses = conferenceService.getConferenceParticipantList(conferenceId).stream()
                .map(MemberResponse::of)
                .toList();

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Conference 참여자 조회에 성공했습니다.",
                        responses
                )
        );
    }
}
