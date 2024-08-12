package com.nomz.doctorstudy.member.service;


import com.nomz.doctorstudy.image.entity.Image;
import com.nomz.doctorstudy.image.exception.FileErrorCode;
import com.nomz.doctorstudy.image.exception.FileException;
import com.nomz.doctorstudy.image.repository.ImageRepository;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.exception.member.MemberErrorCode;
import com.nomz.doctorstudy.member.exception.member.MemberException;
import com.nomz.doctorstudy.member.repository.MemberRepository;
import com.nomz.doctorstudy.member.request.MemberRegisterPostReq;
import com.nomz.doctorstudy.member.request.UpdateMemberInfoRequest;
import com.nomz.doctorstudy.member.request.UpdatedMemberInfoRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("memberService")
@RequiredArgsConstructor
@Slf4j
public class MemberService {
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	private final ImageRepository imageRepository;

	@Transactional
	public Member createUser(MemberRegisterPostReq userRegisterInfo) {

		//아이디 동일한거 제거
		if(memberRepository.findByEmail(userRegisterInfo.getEmail()).isPresent()){
			throw new MemberException(MemberErrorCode.MEMBER_EMAIL_EXIST_ERROR);
		}

		Image image = null;
		if (userRegisterInfo.getImageId() != null) {
			image = imageRepository.findById(userRegisterInfo.getImageId())
					.orElseThrow(() -> new FileException(FileErrorCode.IMAGE_NOT_FOUND));
		}

		Member member = Member.builder()
				.email(userRegisterInfo.getEmail())
				.password(passwordEncoder.encode(userRegisterInfo.getPassword()))
				.nickname(userRegisterInfo.getNickname())
				.image(image)
				.build();

		return memberRepository.save(member);
	}

	public Member getMemberByEmail(String email) {
		// 디비에 유저 정보 조회 (userId 를 통한 조회).
//		return memberRepository.findByUserId(userId);

		return memberRepository.findByEmail(email)
				.orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_EMAIL_NOT_FOUND_ERROR));
	}

	public Member getMemberById(Long id){

		return memberRepository.findById(id)
				.orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_NOT_FOUND_ERROR));
	}

	@Transactional
	public Member updateMemberInfo(UpdateMemberInfoRequest updateMemberInfoRequest, String email){
		Member member = memberRepository.findByEmail(email)
				.orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_NOT_FOUND_ERROR));

		String encoderPassword = updateMemberInfoRequest.getPassword() == null ?
				member.getPassword() : passwordEncoder.encode(updateMemberInfoRequest.getPassword());

		Image image = imageRepository.findById(updateMemberInfoRequest.getImageId())
				.orElseThrow(() -> new FileException(FileErrorCode.IMAGE_NOT_FOUND));

		UpdatedMemberInfoRequest updatedMemberInfoRequest = UpdatedMemberInfoRequest
				.builder()
				.image(image)
				.nickname(updateMemberInfoRequest.getNickname())
				.password(encoderPassword)
				.build();

		log.info("before member = {}", member);
		member.updateMemberInfo(updatedMemberInfoRequest);
		log.info("after member = {}", member);

		return member;
	}

	@Transactional
	public Member deleteMember(Long memberId){
		Member member = memberRepository.findById(memberId)
				.orElseThrow(() -> new MemberException(MemberErrorCode.MEMBER_NOT_FOUND_ERROR));

		member.delete();

		return member;
	}

	public void isLeavedMemberInRegister(String email){
		Optional<Member> member = memberRepository.findByEmail(email);

		if(member.isPresent() && member.get().isLeaved()){
			throw new MemberException(MemberErrorCode.MEMBER_LEAVED_ERROR);
		} else if(member.isPresent()){
			throw new MemberException(MemberErrorCode.MEMBER_EMAIL_EXIST_ERROR);
		}




	}


}
