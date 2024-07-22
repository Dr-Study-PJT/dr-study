package com.nomz.doctorstudy.conference;

import com.nomz.doctorstudy.common.dto.SuccessResponse;
import com.nomz.doctorstudy.common.dto.ErrorResponse;
import com.nomz.doctorstudy.conference.request.CreateConferenceRequest;
import com.nomz.doctorstudy.conference.request.GetConferenceListRequest;
import com.nomz.doctorstudy.conference.response.CreateConferenceResponse;
import com.nomz.doctorstudy.conference.response.GetConferenceListResponse;
import com.nomz.doctorstudy.conference.response.GetConferenceResponse;
import com.nomz.doctorstudy.conference.response.FinishConferenceResponse;
import com.nomz.doctorstudy.conference.service.ConferenceService;
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
            @Valid @RequestBody CreateConferenceRequest request
    ) {
        log.info("CreateConferenceRequest = {}", request);

        Long conferenceId = conferenceService.createConference(request).getId();
        CreateConferenceResponse response = new CreateConferenceResponse(conferenceId);

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Conference 생성에 성공했습니다.",
                        response
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
    public ResponseEntity<SuccessResponse<FinishConferenceResponse>> finishConference(
            @PathVariable("conference_id") Long conferenceId
    ) {
        // ConferenceService의 수정 로직 호출

        FinishConferenceResponse response = null;

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Conference 수정에 성공했습니다.",
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
        GetConferenceResponse response = new GetConferenceResponse(conferenceId, conference.getTitle(), conference.getMemberCapacity());

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
    public ResponseEntity<SuccessResponse<List<GetConferenceListResponse>>> getConferenceList(
            @ParameterObject @ModelAttribute GetConferenceListRequest request
    ) {
        GetConferenceListRequest command = GetConferenceListRequest.builder()
                .title(request.getTitle())
                .memberCapacity(request.getMemberCapacity())
                .build();

        List<Conference> conferenceList = conferenceService.getConferenceList(command);

        List<GetConferenceListResponse> responseList = conferenceList.stream().map(GetConferenceListResponse::of).toList();

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Conference 리스트 조회에 성공했습니다.",
                        responseList
                )
        );
    }
}
