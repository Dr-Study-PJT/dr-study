package com.nomz.doctorstudy.image.controller;

import com.nomz.doctorstudy.common.dto.ErrorResponse;
import com.nomz.doctorstudy.common.dto.SuccessResponse;
import com.nomz.doctorstudy.image.request.MediaUploadRequest;
import com.nomz.doctorstudy.image.service.MediaService;
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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/media")
@Slf4j
@RequiredArgsConstructor
@Tag(name = "Media API", description = "S3 API 입니다.")
public class MediaController {
    private final MediaService mediaService;

    @PostMapping()
    @Operation(summary = "파일 저장", description = "s3에 파이릉ㄹ 저장합니다.(가능한 확장자 : jpg, jpeg, png, mp3, mp4)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "파일 업로드 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "파일 업로드 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "파일 업로드에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """))),
    })
    public ResponseEntity<SuccessResponse<?>> saveImg(@Valid @ModelAttribute MediaUploadRequest mediaUploadRequest){
        log.info("mediaUploadRequest.getFile() = {}", mediaUploadRequest.getFile());
        log.info("mediaUploadRequest.getDomain() = {}", mediaUploadRequest.getDomain());

        String url = mediaService.save(mediaUploadRequest);

        return ResponseEntity.ok(
                new SuccessResponse<>("파일 업로드에 성공했습니다.", url)
        );
    }
}
