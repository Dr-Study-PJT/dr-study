package com.nomz.doctor_study.jwt.service;

import com.nomz.doctor_study.Member.entity.Member;
import com.nomz.doctor_study.jwt.request.UserRegisterPostReq;
import com.ssafy.api.jwt.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	Member createUser(UserRegisterPostReq userRegisterInfo);
	Member getUserByUserId(String userId);
}
