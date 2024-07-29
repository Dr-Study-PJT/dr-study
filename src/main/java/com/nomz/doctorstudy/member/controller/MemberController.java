package com.nomz.doctorstudy.member.controller;


import com.nomz.doctorstudy.common.auth.MemberDetails;
import com.nomz.doctorstudy.common.dto.ErrorResponse;
import com.nomz.doctorstudy.common.dto.SuccessResponse;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.exception.auth.AuthErrorCode;
import com.nomz.doctorstudy.member.exception.auth.AuthException;
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

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
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

        //임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
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
                    """))),    })
    public ResponseEntity<?> getUserInfo(Authentication authentication) {
        /**
         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
         * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
         */
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

}
