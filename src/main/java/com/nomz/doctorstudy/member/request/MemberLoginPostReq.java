package com.nomz.doctorstudy.member.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API ([POST] /api/v1/auth/login) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
public class MemberLoginPostReq {
	@NotBlank(message = "이메일을 입력해주세요")
	@Schema(description = "이메일", defaultValue = "test1@example.com")
	private String email;

	@NotBlank(message = "비밀번호를 입력해주세요")
	@Schema(description = "비밀번호", defaultValue = "test")
	private String password;

}
