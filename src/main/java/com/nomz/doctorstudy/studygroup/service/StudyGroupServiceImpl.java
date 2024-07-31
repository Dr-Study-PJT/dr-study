package com.nomz.doctorstudy.studygroup.service;

import com.nomz.doctorstudy.common.auth.MemberDetails;
import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.exception.auth.AuthErrorCode;
import com.nomz.doctorstudy.member.exception.auth.AuthException;
import com.nomz.doctorstudy.member.repository.MemberRepository;
import com.nomz.doctorstudy.member.service.MemberService;
import com.nomz.doctorstudy.studygroup.Status;
import com.nomz.doctorstudy.studygroup.exception.StudyGroupErrorCode;
import com.nomz.doctorstudy.studygroup.dto.StudyGroupSearchFilter;
import com.nomz.doctorstudy.studygroup.entity.*;
import com.nomz.doctorstudy.studygroup.exception.StudyGroupException;
import com.nomz.doctorstudy.studygroup.repository.*;
import com.nomz.doctorstudy.studygroup.request.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class StudyGroupServiceImpl implements StudyGroupService {

    private final StudyGroupRepository studyGroupRepository;
    private final StudyGroupQueryRepository studyGroupQueryRepository;
    private final TagRepository tagRepository;
    private final StudyGroupTagRepository studyGroupTagRepository;
    private final MemberRepository memberRepository;
    private final MemberStudyGroupApplyRepository memberStudyGroupApplyRepository;
    private final MemberStudyGroupRepository memberStudyGroupRepository;
    private final MemberService memberService;

    @Override
    public StudyGroup createStudyGroup(CreateStudyGroupRequest request, Authentication authentication) {
        // JWT 토큰에서 사용자 가져오기
        // --------------------------------------------------------------------------
        if(authentication == null){
            throw new AuthException(AuthErrorCode.AUTH_NOT_VALID_ACCESS_TOKEN);
        }
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        String email = memberDetails.getUsername();
        Member member = memberService.getUserByEmail(email);
        // --------------------------------------------------------------------------
        StudyGroup studyGroup = StudyGroup.builder()
                .name(request.getName())
                .imageId(request.getImageId())
                .captain(member)
                .createdAt(LocalDateTime.now())
                .isDeleted(false)
                .description(request.getDescription())
                .dueDate(request.getDueDate())
                .memberCount(1)
                .memberCapacity(request.getMemberCapacity())
                .build();
        studyGroupRepository.save(studyGroup);
        log.info("[new studyGroup] id={}, title={}", studyGroup.getId(), studyGroup.getName());

        if(request.getTags() != null && !request.getTags().isEmpty()){
            List<StudyGroupTag> studyGroupTags = request.getTags().stream()
                    .map(name -> {
                        Tag tag = tagRepository.findByName(name)
                                .orElseGet(() -> tagRepository.save(new Tag(name)));
                        return new StudyGroupTag(tag, studyGroup);
                    }).collect(Collectors.toList());

            studyGroupTagRepository.saveAll(studyGroupTags);
        }
        MemberStudyGroupId memberStudyGroupIdObject  = new MemberStudyGroupId(member.getId(), studyGroup.getId());
        MemberStudyGroup memberStudyGroup = MemberStudyGroup.builder()
                .memberStudyGroupId(memberStudyGroupIdObject)
                .member(member)
                .studyGroup(studyGroup)
                .role("LEADER") // 기본 역할 설정
                .joinDate(LocalDateTime.now())
                .isLeaved(false)
                .build();
        memberStudyGroupRepository.save(memberStudyGroup);
        return studyGroup;
    }

    @Override
    public StudyGroup getStudyGroup(Long groupId) {
        return studyGroupRepository.findByIdWithTags(groupId)
                .orElseThrow(() -> new BusinessException(StudyGroupErrorCode.STUDYGROUP_NOT_FOUND_ERROR));
    }

    @Override
    public List<StudyGroup> getStudyGroupList(GetStudyGroupListRequest command) {
        return studyGroupQueryRepository.getStudyGroupList(
                StudyGroupSearchFilter.builder()
                        .name(command.getName())
                        .memberCapacity(command.getMemberCapacity())
                        .tagName(command.getTagName())
                        .build()
        );
    }

    @Override
    public MemberStudyGroupApply createApply(CreateApplyRequest createApplyRequest, Authentication authentication) {
        // JWT 토큰에서 사용자 가져오기
        // --------------------------------------------------------------------------
        if(authentication == null){
            throw new AuthException(AuthErrorCode.AUTH_NOT_VALID_ACCESS_TOKEN);
        }
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        String email = memberDetails.getUsername();
        Member member = memberService.getUserByEmail(email);
        // --------------------------------------------------------------------------
        StudyGroup studyGroup = studyGroupRepository.findById(createApplyRequest.getStudyGroupId())
                .orElseThrow(() -> new BusinessException(StudyGroupErrorCode.STUDYGROUP_NOT_FOUND_ERROR));

        if(memberStudyGroupApplyRepository.findByMemberIdAndStudyGroupId(member.getId(), createApplyRequest.getStudyGroupId()).isPresent()){
            throw new StudyGroupException(StudyGroupErrorCode.STUDYGROUP_ALREADY_JOINED_ERROR);
        }

        // 새로운 멤버-그룹-지원 엔티티 생성
        MemberStudyGroupApply apply = MemberStudyGroupApply.builder()
                .member(member)
                .studyGroup(studyGroup)
                .message(createApplyRequest.getMessage())
                .status(Status.WAITING)
                .createdAt(LocalDateTime.now())
                .build();

        // Save
        return memberStudyGroupApplyRepository.save(apply);

    }

    @Override
    public MemberStudyGroupApply getApply(Long userId, Long groupId) {
        return memberStudyGroupApplyRepository.findByMemberIdAndStudyGroupId(userId, groupId)
                .orElseThrow(() -> new BusinessException(StudyGroupErrorCode.APPLY_NOT_FOUND_ERROR));
    }

    @Override
    @Transactional
    public MemberStudyGroupApply processReply(CreateReplyRequest createReplyRequest) {
         // 1. 지원 정보 가져오기
        MemberStudyGroupApply apply = memberStudyGroupApplyRepository.findById(createReplyRequest.getApplyId())
                .orElseThrow(() -> new BusinessException(StudyGroupErrorCode.APPLY_NOT_FOUND_ERROR));

        // 2. status 변경
        apply.setStatus(createReplyRequest.getStatus());
        memberStudyGroupApplyRepository.save(apply);

        // 3. 사용자 - 스터디 그룹 테이블에 데이터 저장
        if(createReplyRequest.getStatus() == Status.APPROVED){
            MemberStudyGroupId memberStudyGroupIdObject  = new MemberStudyGroupId(apply.getMember().getId(), apply.getStudyGroup().getId());
            MemberStudyGroup memberStudyGroup = MemberStudyGroup.builder()
                    .memberStudyGroupId(memberStudyGroupIdObject)
                    .member(apply.getMember())
                    .studyGroup(apply.getStudyGroup())
                    .role("MEMBER") // 기본 역할 설정
                    .joinDate(LocalDateTime.now())
                    .isLeaved(false)
                    .build();
            memberStudyGroupRepository.save(memberStudyGroup);
        }
        return apply;
    }

    @Override
    public StudyGroup updateStudyGroup(Long groupId, UpdateStudyGroupRequest request) {
        StudyGroup studyGroup = studyGroupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessException(StudyGroupErrorCode.STUDYGROUP_NOT_FOUND_ERROR));
        Member captain = memberRepository.findById(request.getCaptainId())
                .orElseThrow(() -> new BusinessException(StudyGroupErrorCode.STUDYGROUP_NOT_FOUND_ERROR));
        if (request.getName() != null) {
            studyGroup.setName(request.getName());
        }
        if (request.getDescription() != null) {
            studyGroup.setDescription(request.getDescription());
        }
        if (request.getCaptainId() != null) {
            studyGroup.setCaptain(captain);
        }
        if (request.getImageId() != null) {
            studyGroup.setImageId(request.getImageId());
        }
        // 기타 필드에 대해 동일하게 처리
        return studyGroupRepository.save(studyGroup);
    }

    @Override
    public List<MemberStudyGroup> getMemberListByStudyGroupId(Long studyGroupId) {
        return memberStudyGroupRepository.findByMemberStudyGroupIdStudyGroupId(studyGroupId);
    }

    @Override
    public List<MemberStudyGroupApply> getWaiterList(Authentication authentication) {
        // JWT 토큰에서 사용자 가져오기
        // --------------------------------------------------------------------------
        if(authentication == null){
            throw new AuthException(AuthErrorCode.AUTH_NOT_VALID_ACCESS_TOKEN);
        }
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        String email = memberDetails.getUsername();
        Member member = memberService.getUserByEmail(email);
        // --------------------------------------------------------------------------

        // 1. 이 멤버가 그룹장인지 찾기
        List<StudyGroup> GroupList = studyGroupRepository.findByCaptain(member);
        if (GroupList.isEmpty()) {
            throw new BusinessException(StudyGroupErrorCode.USER_NOT_GROUP_CAPTAIN);
        }
        // 2. 그룹장이라면 그 그룹에 WAITING중인 멤버들을 리스트로 담기
        List<Long> groupIds = GroupList.stream()
                .map(StudyGroup::getId)
                .toList();

        return memberStudyGroupApplyRepository.findByStudyGroupIdInAndStatus(groupIds, Status.WAITING);
    }

//    @Override
//    public StudyGroup updateStudyGroup(Long groupId, StudyGroup studyGroupDetails) {
//        StudyGroup existingStudyGroup = studyGroupRepository.findById(groupId)
//                .orElseThrow(() -> new RuntimeException("StudyGroup not found"));
//
//        existingStudyGroup.setName(studyGroupDetails.getName());
//     Group.setImageId(studyGroupDetails.getImageId());
//        existingStudy   existingStudyGroup.setCaptainId(studyGroupDetails.getCaptainId());
//        existingStudyGroup.setDescription(studyGroupDetails.getDescription());
//        existingStudyGroup.setGoal(studyGroupDetails.getGoal());
//        existingStudyGroup.setDueDate(studyGroupDetails.getDueDate());
//        existingStudyGroup.setMemberCapacity(studyGroupDetails.getMemberCapacity());
//
//        return studyGroupRepository.save(existingStudyGroup);
//    }

//
//    @Override
//    public List<StudyGroup> getAllStudyGroups() {
//        return studyGroupRepository.findAll();
//    }
//
//    @Override
//    public void deleteStudyGroup(Long groupId) {
//        StudyGroup existingStudyGroup = studyGroupRepository.findById(groupId)
//                .orElseThrow(() -> new RuntimeException("StudyGroup not found"));
//        studyGroupRepository.delete(existingStudyGroup);
//    }
//
//    @Override
//    public void applyForStudyGroup(AdmissionRequest admissionRequest) {
//
//    }
//
//    @Override
//    public void respondToStudyGroupApplication(AdmissionResponseRequest admissionResponseRequest) {
//
//    }
//
//    @Override
//    public List<AdmissionResponse> getAllStudyGroupApplications() {
//        return List.of();
//    }


//
//    @Override
//    public void respondToStudyGroupApplication(AdmissionResponseRequest admissionResponseRequest) {
//        // Handle the response to application
//        MemberStudyGroupApply apply = memberStudyGroupApplyRepository.findById(admissionResponseRequest.getAdmissionId())
//                .orElseThrow(() -> new RuntimeException("Application not found"));
//
//        apply.setStatus(admissionResponseRequest.isApproved() ? "APPROVED" : "REJECTED");
//        memberStudyGroupApplyRepository.save(apply);
//    }
//
//    @Override
//    public List<AdmissionResponse> getAllStudyGroupApplications() {
//        // Retrieve all applications
//        List<MemberStudyGroupApply> applications = memberStudyGroupApplyRepository.findAll();
//        return applications.stream().map(application -> {
//            AdmissionResponse response = new AdmissionResponse();
//            response.setAdmissionId(application.getId());
//            response.setMemberId(application.getMemberId());
//            response.setStudyGroupId(application.getStudyGroupId());
//            response.setMessage(application.getMessage());
//            response.setApproved("APPROVED".equals(application.getStatus()));
//            return response;
//        }).collect(Collectors.toList());
//    }

}