package com.nomz.doctorstudy.moderator.controller;

import com.nomz.doctorstudy.common.dto.ErrorResponse;
import com.nomz.doctorstudy.common.dto.SuccessResponse;
import com.nomz.doctorstudy.member.Login;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.moderator.entity.Moderator;
import com.nomz.doctorstudy.moderator.request.CreateModeratorRequest;
import com.nomz.doctorstudy.moderator.request.GetModeratorListRequest;
import com.nomz.doctorstudy.moderator.response.CreateModeratorResponse;
import com.nomz.doctorstudy.moderator.response.GetModeratorResponse;
import com.nomz.doctorstudy.moderator.service.ModeratorService;
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
@RequestMapping("/v1/moderators")
@RequiredArgsConstructor
@Tag(name = "Moderator API", description = "Moderator API 입니다.")
public class ModeratorController {
    private final ModeratorService moderatorService;


    @PostMapping
    @Operation(summary = "Moderator 생성", description = "Moderator를 생성합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Moderator 생성 성공", useReturnTypeSchema = true),
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
    public ResponseEntity<SuccessResponse<CreateModeratorResponse>> createModerator(
            @Parameter(hidden = true) @Login Member requester,
            @RequestBody CreateModeratorRequest request
    ) {
        Long moderatorId = moderatorService.createModerator(requester, request);

        CreateModeratorResponse response = CreateModeratorResponse.builder()
                .id(moderatorId)
                .build();

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Moderator 생성에 성공했습니다.",
                        response
                )
        );
    }

    @GetMapping("/{moderatorId}")
    public ResponseEntity<SuccessResponse<GetModeratorResponse>> getModerator(@PathVariable("moderatorId") Long moderatorId) {
        Moderator moderator = moderatorService.getModerator(moderatorId);

        GetModeratorResponse response = GetModeratorResponse.of(moderator);

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Moderator 조회에 성공했습니다.",
                        response
                )
        );
    }


    @GetMapping
    @Operation(summary = "Moderator 리스트 조회", description = "Moderator 리스트를 검색합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Moderator 리스트 검색 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Moderator 리스트 검색 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "Moderator 조회에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """)))
    })
    public ResponseEntity<SuccessResponse<List<GetModeratorResponse>>> getModeratorList(
            @ParameterObject @Valid @ModelAttribute GetModeratorListRequest request
    ) {
        List<Moderator> moderatorList = moderatorService.getModeratorList(request);
        List<GetModeratorResponse> responses = moderatorList.stream().map(GetModeratorResponse::of).toList();

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Moderator 조회에 성공했습니다.",
                        responses
                )
        );
    }
}
