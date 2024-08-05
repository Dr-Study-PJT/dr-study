package com.nomz.doctorstudy.member.controller;

import com.nomz.doctorstudy.common.auth.MemberDetails;
import com.nomz.doctorstudy.common.dto.ErrorResponse;
import com.nomz.doctorstudy.common.dto.SuccessResponse;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.exception.auth.AuthErrorCode;
import com.nomz.doctorstudy.member.exception.auth.AuthException;
import com.nomz.doctorstudy.member.request.EmailSendRequest;
import com.nomz.doctorstudy.member.request.MemberRegisterPostReq;
import com.nomz.doctorstudy.member.service.MemberService;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/members")
@Slf4j
@RequiredArgsConstructor
@Tag(name = "Member API", description = "Member API")
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/register")
    @Operation(summary = "Member 생성", description = "Member를 생성합니다")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Member 생성 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "유효하지 않은 입력", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "유효하지 않은 입력입니다.",
                        "errors": {
                            "email": "이메일은 필수 입력값입니다.",
                            "password": "비밀번호는 필수 입력값입니다.",
                            "nickname" : "닉네임은 필수 입력값입니다."
                        }
                    }
                    """)))
    })
    public ResponseEntity<?> register(
            @RequestBody @Valid MemberRegisterPostReq registerInfo) {
        log.info("registerInfo = {}", registerInfo.getNickname());

        Member member = memberService.createUser(registerInfo);

        return ResponseEntity.status(HttpStatus.CREATED).body(
                new SuccessResponse<>("성공적으로 회원가입 되었습니다.", null)
        );
    }

    @GetMapping()
    @Operation(summary = "Member 조회", description = "로그인된 Member를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회되었습니다.", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "조회에 실패했습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "유효하지 않은 입력입니다.",
                        "errors": {
                        }
                    }
                    """))),
            @ApiResponse(responseCode = "401", description = "다시 로그인해주세요.", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "유효하지 않은 유저입니다.",
                        "errors": {
                        }
                    }
                    """))),
    })
    public ResponseEntity<?> getLoginMemberInfo(Authentication authentication) {

        if(authentication == null){
            throw new AuthException(AuthErrorCode.AUTH_NOT_VALID_ACCESS_TOKEN);
        }

        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        String email = memberDetails.getUsername();

        Member member = memberService.getUserByEmail(email);

        return ResponseEntity.ok(
                new SuccessResponse<>("조회되었습니다.", member)
        );
    }

    @GetMapping("/{memberEmail}")
    @Operation(summary = "Member 조회", description = "Member를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "조회되었습니다.", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "조회에 실패했습니다.", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "유효하지 않은 입력입니다.",
                        "errors": {
                        }
                    }
                    """))),
            @ApiResponse(responseCode = "401", description = "다시 로그인해주세요.", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "유효하지 않은 유저입니다.",
                        "errors": {
                        }
                    }
                    """))),
    })
    public ResponseEntity<?> getMemberInfo(@PathVariable(name = "memberEmail") @Valid String email) {

        log.info("memberEMAIL = {}", email);
        Member member = memberService.getUserByEmail(email);

        return ResponseEntity.ok(
                new SuccessResponse<>("조회되었습니다.", member)
        );
    }

}