package com.nomz.doctorstudy.member.service;


import com.nomz.doctorstudy.common.auth.MemberDetails;
import com.nomz.doctorstudy.image.entity.Image;
import com.nomz.doctorstudy.image.exception.ImageErrorCode;
import com.nomz.doctorstudy.image.exception.ImageException;
import com.nomz.doctorstudy.image.repository.ImageRepository;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.exception.auth.AuthErrorCode;
import com.nomz.doctorstudy.member.exception.auth.AuthException;
import com.nomz.doctorstudy.member.exception.member.MemberErrorCode;
import com.nomz.doctorstudy.member.exception.member.MemberException;
import com.nomz.doctorstudy.member.repository.MemberRepository;
import com.nomz.doctorstudy.member.request.MemberRegisterPostReq;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("memberService")
@RequiredArgsConstructor
public class MemberService {
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	private final ImageRepository imageRepository;

	@Transactional
	public Member createUser(MemberRegisterPostReq userRegisterInfo) {
//		Member member = new Member();
//		member.setUserId(userRegisterInfo.getId());
//		member.setEmail(userRegisterInfo.getEmail());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
//		member.setPassword(passwordEncoder.encode(userRegisterInfo.getPassword()));

		//아이디 동일한거 제거
		if(memberRepository.findByEmail(userRegisterInfo.getEmail()).isPresent()){
			throw new MemberException(MemberErrorCode.MEMBER_EMAIL_EXIST_ERROR);
		}

		Image image = null;
		if (userRegisterInfo.getImageId() != null) {
			image = imageRepository.findById(userRegisterInfo.getImageId())
					.orElseThrow(() -> new ImageException(ImageErrorCode.IMAGE_NOT_FOUND));
		}

		Member member = Member.builder()
				.email(userRegisterInfo.getEmail())
				.password(passwordEncoder.encode(userRegisterInfo.getPassword()))
				.nickname(userRegisterInfo.getNickname())
				.image(image)
				.build();

		return memberRepository.save(member);
	}

//	@Override
//	public Member getUserByUserId(String userId) {
//		// 디비에 유저 정보 조회 (userId 를 통한 조회).
//		return memberRepository.findByUserId(userId);
//	}


	public Member getUserByEmail(String email) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
//		return memberRepository.findByUserId(userId);

		return memberRepository.findByEmail(email)
				.orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_EMAIL_NOT_FOUND_ERROR));
	}
}
