package com.nomz.doctorstudy.studygroup.service;

import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.member.Member;
import com.nomz.doctorstudy.member.MemberRepository;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupApply;
import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import com.nomz.doctorstudy.studygroup.StudyGroupErrorCode;
import com.nomz.doctorstudy.studygroup.dto.StudyGroupSearchFilter;
import com.nomz.doctorstudy.studygroup.entity.StudyGroupTag;
import com.nomz.doctorstudy.studygroup.entity.Tag;
import com.nomz.doctorstudy.studygroup.repository.*;
import com.nomz.doctorstudy.studygroup.request.CreateApplyRequest;
import com.nomz.doctorstudy.studygroup.request.CreateStudyGroupRequest;
import com.nomz.doctorstudy.studygroup.request.GetStudyGroupListRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @Override
    public StudyGroup createStudyGroup(CreateStudyGroupRequest request) {
        StudyGroup studyGroup = StudyGroup.builder()
                .name(request.getName())
                .imageId(request.getImageId())
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

        return studyGroup;
    }


//    @Override
//    public StudyGroup getStudyGroup(Long groupId) {
//        return studyGroupRepository.findById(groupId)
//                .orElseThrow(() ->  new BusinessException(StudyGroupErrorCode.STUDYGROUP_NOT_FOUND_ERROR));
//    }

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
    public MemberStudyGroupApply createApply(CreateApplyRequest createApplyRequest) {
        Member member = memberRepository.findById(createApplyRequest.getMemberId())
                .orElseThrow(() -> new RuntimeException("Member not found"));

        StudyGroup studyGroup = studyGroupRepository.findById(createApplyRequest.getStudyGroupId())
                .orElseThrow(() -> new RuntimeException("Study group not found"));

        if(memberStudyGroupApplyRepository.findByMemberIdAndStudyGroupId(createApplyRequest.getMemberId(), createApplyRequest.getStudyGroupId()).isPresent()){
            throw new RuntimeException("이미 해당 스터디 그룹에 지원했습니다.");
        }

        // 새로운 멤버-그룹-지원 엔티티 생성
        MemberStudyGroupApply apply = MemberStudyGroupApply.builder()
                .member(member)
                .studyGroup(studyGroup)
                .message(createApplyRequest.getMessage())
                .status("PENDING")
                .createdAt(LocalDateTime.now())
                .build();

        // Save
        return memberStudyGroupApplyRepository.save(apply);

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