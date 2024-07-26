package com.nomz.doctorstudy.board.controller;

import com.nomz.doctorstudy.common.dto.ErrorResponse;
import com.nomz.doctorstudy.common.dto.SuccessResponse;
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
import org.springframework.web.bind.annotation.*;

@Slf4j
@Validated
@RestController
@RequestMapping("/v1/board")
@RequiredArgsConstructor
@Tag(name ="Board API", description = "게시판 API 입니다.")
public class BoardController {

//    @PostMapping
//    @Operation(summary = "글 작성", description = "글 작성 성공")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "201", description = "Study Group 생성 성공"),
//            @ApiResponse(responseCode = "400", description = "유효하지 않은 입력", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
//                    {
//                        "message": "유효하지 않은 입력입니다.",
//                        "errors": {
//                            "title": "제목은 1자이상 64자 이하여야 합니다.",
//                            "thumbnailImageId": "썸네일 이미지 아이디는 반드시 포함되어야 합니다."
//                        }
//                    }
//                    """))),
//            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
//                    {
//                        "message": "인증에 실패했습니다.",
//                        "errors": { }
//                    }
//                    """)))
//    })
//    public ResponseEntity<SuccessResponse<CreateBoardResponse>> createBoard(){
//
//    }

}
