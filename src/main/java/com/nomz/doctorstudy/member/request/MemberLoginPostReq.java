package com.nomz.doctorstudy.member.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API ([POST] /api/v1/auth/login) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
public class MemberLoginPostReq {
	@NotBlank(message = "비밀번호를 입력해주세요")
	private String password;
	@NotBlank(message = "이메일을 입력해주세요")
	private String email;
}
