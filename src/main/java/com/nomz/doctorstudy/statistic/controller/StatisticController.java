package com.nomz.doctorstudy.statistic.controller;

import com.nomz.doctorstudy.common.dto.ErrorResponse;
import com.nomz.doctorstudy.common.dto.SuccessResponse;
import com.nomz.doctorstudy.statistic.dto.MemberStatisticDTO;
import com.nomz.doctorstudy.statistic.service.StatisticService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Validated
@RestController
@RequestMapping("/v1/statistics")
@RequiredArgsConstructor
@Tag(name = "Statistics API", description = "통계 API 입니다.")
public class StatisticController {
    private final StatisticService statisticService;

    @GetMapping("/members/{memberId}")
    @Operation(summary = "멤버 통계 조회", description = "Member Statistics 정보를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Member Statistics 조회 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "404", description = "Member Statistics 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "Member Statistics 조회에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """)))
    })
    public ResponseEntity<SuccessResponse<MemberStatisticDTO>> getConference(
            @PathVariable("memberId") Long memberId) {
        MemberStatisticDTO participations = statisticService.getMemberStatistic(memberId);

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Member Statistics 조회에 성공했습니다.",
                        participations
                )
        );
    }
}
