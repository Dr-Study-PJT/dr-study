package com.nomz.doctorstudy.conference.controller;

import com.nomz.doctorstudy.common.dto.SuccessResponse;
import com.nomz.doctorstudy.common.dto.ErrorResponse;
import com.nomz.doctorstudy.conference.entity.Conference;
import com.nomz.doctorstudy.conference.request.*;
import com.nomz.doctorstudy.conference.response.*;
import com.nomz.doctorstudy.conference.service.ConferenceService;
import com.nomz.doctorstudy.member.Login;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.response.MemberInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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
            @Parameter(hidden = true) @Login Member requester,
            @Valid @RequestBody CreateConferenceRequest request
    ) {
        Long conferenceId = conferenceService.createConference(requester, request);
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

        GetConferenceResponse response = GetConferenceResponse.of(conference);

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
    public ResponseEntity<SuccessResponse<List<GetConferenceResponse>>> getConferenceList(
            @ParameterObject @ModelAttribute GetConferenceListRequest request
    ) {
        // TODO: 조인으로 성능 최적화 필요
        List<GetConferenceResponse> responses = conferenceService.getConferenceList(request).stream()
                .map(GetConferenceResponse::of)
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
            @Parameter(hidden = true) @Login Member requester,
            @PathVariable("conference_id") Long conferenceId,
            @RequestBody OpenConferenceRequest request
    ) {
        conferenceService.openConference(conferenceId, request);

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Conference 개최에 성공했습니다.",
                        null
                )
        );
    }


    @PostMapping("/{conference_id}/close")
    @Operation(summary = "Conference 폐회", description = "Conference를 폐회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Conference 폐회 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "인증에 실패했습니다.",
                        "errors": { }
                    }
                    """))),
            @ApiResponse(responseCode = "403", description = "권한 없음", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "권한이 없습니다. 호스트 유저만이 폐회시킬 수 있습니다.",
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
    public ResponseEntity<SuccessResponse<?>> closeConference(
            @Parameter(hidden = true) @Login Member requester,
            @PathVariable("conference_id") Long conferenceId
    ) {
        conferenceService.closeConference(conferenceId);

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Conference 폐회에 성공했습니다.",
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
            @Parameter(hidden = true) @Login Member requester,
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
            @Parameter(hidden = true) @Login Member requester,
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
    @Operation(summary = "Conference 참여", description = "Conference에 참여합니다. 요청바디: 새 참여자의 peerId, 응답바디: 기존 참여자들의 peerId 리스트")
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
            @Parameter(hidden = true) @Login Member requester,
            @PathVariable("conferenceId") Long conferenceId,
            @RequestBody JoinConferenceRequest request
    ) {
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
            @Parameter(hidden = true) @Login Member requester,
            @PathVariable("conferenceId") Long conferenceId,
            @RequestBody InviteMemberConferenceRequest request
    ) {
        conferenceService.inviteMemberConference(requester, conferenceId, request);

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Conference 멤버 초대에 성공했습니다.",
                        null
                )
        );
    }


    @GetMapping("/{conferenceId}/participants")
    @Operation(summary = "Conference 참여자 리스트 조회", description = "Conference 참여자 리스트를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Conference 참여자 리스트 검색 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Conference 참여자 리스트 검색 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "Conference 참여자 리스트 조회에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """)))
    })
    public ResponseEntity<SuccessResponse<List<MemberInfo>>> getConferenceParticipantList(
            @PathVariable("conferenceId") Long conferenceId
    ) {
        List<MemberInfo> responses = conferenceService.getConferenceParticipantList(conferenceId).stream()
                .map(MemberInfo::of)
                .toList();

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Conference 참여자 리스트 조회에 성공했습니다.",
                        responses
                )
        );
    }


    @GetMapping("/{conferenceId}/invitees")
    @Operation(summary = "Conference 초대받은 멤버 리스트 조회", description = "Conference 초대받은 멤버 리스트를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Conference 초대받은 멤버 리스트 검색 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Conference 초대받은 멤버 리스트 검색 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "Conference 초대받은 멤버 리스트 조회에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """)))
    })
    public ResponseEntity<SuccessResponse<List<MemberInfo>>> getConferenceInvitees(
            @PathVariable("conferenceId") Long conferenceId
    ) {
        List<MemberInfo> responses = conferenceService.getConferenceInvitees(conferenceId).stream()
                .map(MemberInfo::of)
                .toList();

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Conference 참여자 리스트 조회에 성공했습니다.",
                        responses
                )
        );
    }

}
