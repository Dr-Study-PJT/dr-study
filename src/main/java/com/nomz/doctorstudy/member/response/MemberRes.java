package com.nomz.doctorstudy.member.response;


import com.nomz.doctorstudy.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
public class MemberRes {
	String userId;
	
	public static MemberRes of(Member member) {
		MemberRes res = new MemberRes();
		res.setUserId(member.getEmail());
		return res;
	}
}
