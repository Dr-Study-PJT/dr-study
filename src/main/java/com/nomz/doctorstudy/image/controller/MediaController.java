package com.nomz.doctorstudy.image.controller;

import com.nomz.doctorstudy.common.dto.ErrorResponse;
import com.nomz.doctorstudy.common.dto.SuccessResponse;
import com.nomz.doctorstudy.image.request.ImageUploadRequest;
import com.nomz.doctorstudy.image.response.ImageResponse;
import com.nomz.doctorstudy.image.service.MediaService;
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
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/media")
@Slf4j
@RequiredArgsConstructor
@Tag(name = "Media API", description = "S3 API 입니다.")
public class MediaController {
    private final MediaService mediaService;

    @PostMapping()
    @Operation(summary = "이미지 저장", description = "s3에 파이릉ㄹ 저장합니다.(가능한 확장자 : jpg, jpeg, png)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "이미지 업로드 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "이미지 업로드 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "이미지 업로드에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """))),
    })
    public ResponseEntity<SuccessResponse<?>> saveImg(@ModelAttribute ImageUploadRequest imageUploadRequest){
        log.info("imageUploadRequest.getFile() = {}", imageUploadRequest.getFile());
        log.info("imageUploadRequest.getDomain() = {}", imageUploadRequest.getDomain());

        ImageResponse imageResponse = mediaService.saveImg(imageUploadRequest);

        return ResponseEntity.ok(
                new SuccessResponse<>("파일 업로드에 성공했습니다.", imageResponse)
        );
    }

}
