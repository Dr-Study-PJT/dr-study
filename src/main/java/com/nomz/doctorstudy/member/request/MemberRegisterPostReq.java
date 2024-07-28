package com.nomz.doctorstudy.member.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
public class MemberRegisterPostReq {
	@NotBlank(message = "이메일을 입력해주세요")
	private String email;

	@NotBlank(message = "비밀번호를 입력해주세요")
	private String password;

	@NotBlank(message = "닉네임을 잘 입력해주세요")
	private String nickname;

	private long image_id;

}
