package com.nomz.doctorstudy.member.response;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

/**
 * 유저 로그인 API ([POST] /api/v1/auth) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
public class MemberLoginPostRes {
	String accessToken;
	String refreshToken;
	
	public static MemberLoginPostRes of(Map<String, String> tokens) {
		MemberLoginPostRes res = new MemberLoginPostRes();
		res.setAccessToken(tokens.get("accessToken"));
		res.setRefreshToken(tokens.get("refreshToken"));

		return res;
	}
}
