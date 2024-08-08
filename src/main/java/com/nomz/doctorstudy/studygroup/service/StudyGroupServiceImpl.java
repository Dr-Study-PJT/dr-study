package com.nomz.doctorstudy.studygroup.service;

import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.image.entity.Image;
import com.nomz.doctorstudy.image.exception.FileErrorCode;
import com.nomz.doctorstudy.image.repository.ImageRepository;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.member.exception.member.MemberErrorCode;
import com.nomz.doctorstudy.member.repository.MemberRepository;
import com.nomz.doctorstudy.member.service.MemberService;
import com.nomz.doctorstudy.notification.NotificationService;
import com.nomz.doctorstudy.studygroup.ApplicationStatus;
import com.nomz.doctorstudy.studygroup.StudyGroupRole;
import com.nomz.doctorstudy.studygroup.dto.StudyGroupSearchFilter;
import com.nomz.doctorstudy.studygroup.entity.*;
import com.nomz.doctorstudy.studygroup.exception.StudyGroupErrorCode;
import com.nomz.doctorstudy.studygroup.exception.StudyGroupException;
import com.nomz.doctorstudy.studygroup.repository.*;
import com.nomz.doctorstudy.studygroup.request.*;
import com.nomz.doctorstudy.tag.Tag;
import com.nomz.doctorstudy.tag.TagRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
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
    private final ImageRepository imageRepository;
    private final NotificationService notificationService;

    @Override
    public StudyGroup createStudyGroup(CreateStudyGroupRequest request, Member requester) {
        Image image = null;
        Long imageId = request.getImageId();
        if (imageId != null) {
            image = imageRepository.findById(imageId)
                    .orElseThrow(() -> new BusinessException(FileErrorCode.IMAGE_NOT_FOUND));
        } else {
            image = imageRepository.findById(1L)
                    .orElseThrow(() -> new BusinessException(FileErrorCode.IMAGE_NOT_FOUND));
        }
        StudyGroup studyGroup = StudyGroup.builder()
                .name(request.getName())
                .image(image)
                .captain(requester)
                .createdAt(LocalDateTime.now())
                .isDeleted(false)
                .description(request.getDescription())
                .dueDate(request.getDueDate())
                .memberCapacity(request.getMemberCapacity())
                .build();
        studyGroupRepository.save(studyGroup);
        log.info("[new studyGroup] id={}, title={}", studyGroup.getId(), studyGroup.getName());

        if (request.getTags() != null && !request.getTags().isEmpty()) {
            List<StudyGroupTag> studyGroupTags = request.getTags().stream()
                    .map(name -> {
                        Tag tag = tagRepository.findByName(name)
                                .orElseGet(() -> tagRepository.save(new Tag(name)));
                        return new StudyGroupTag(tag, studyGroup);
                    }).collect(Collectors.toList());

            studyGroupTagRepository.saveAll(studyGroupTags);
        }
        MemberStudyGroupId memberStudyGroupIdObject = new MemberStudyGroupId(requester.getId(), studyGroup.getId());
        MemberStudyGroup memberStudyGroup = MemberStudyGroup.builder()
                .memberStudyGroupId(memberStudyGroupIdObject)
                .member(requester)
                .studyGroup(studyGroup)
                .role(StudyGroupRole.CAPTAIN) // 기본 역할 설정
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
    public Page<StudyGroup> getStudyGroupList(GetStudyGroupListRequest command, Pageable pageable) {
        StudyGroupSearchFilter filter = StudyGroupSearchFilter.builder()
                .name(command.getName())
                .memberCapacity(command.getMemberCapacity())
                .tagName(command.getTagName())
                .build();
        return studyGroupQueryRepository.getStudyGroupList(filter, pageable);
    }

    @Override
    public MemberStudyGroupApply createApply(CreateApplyRequest createApplyRequest, Member requester) {

        StudyGroup studyGroup = studyGroupRepository.findById(createApplyRequest.getGroupId())
                .orElseThrow(() -> new BusinessException(StudyGroupErrorCode.STUDYGROUP_NOT_FOUND_ERROR));

        if (memberStudyGroupApplyRepository.findByMemberIdAndStudyGroupId(requester.getId(), createApplyRequest.getGroupId()).isPresent()) {
            throw new StudyGroupException(StudyGroupErrorCode.STUDYGROUP_ALREADY_JOINED_ERROR);
        }

        // 새로운 멤버-그룹-지원 엔티티 생성
        MemberStudyGroupApply apply = MemberStudyGroupApply.builder()
                .member(requester)
                .studyGroup(studyGroup)
                .applyMessage(createApplyRequest.getApplyMessage())
                .applicationStatus(ApplicationStatus.WAITING)
                .createdAt(LocalDateTime.now())
                .build();

        // Save
        memberStudyGroupApplyRepository.save(apply);

        notificationService.createNotification(apply);

        return apply;
    }

    @Override
    public MemberStudyGroupApply getApply(Long userId, Long groupId) {
        return memberStudyGroupApplyRepository.findByMemberIdAndStudyGroupId(userId, groupId)
                .orElseThrow(() -> new BusinessException(StudyGroupErrorCode.APPLY_NOT_FOUND_ERROR));
    }

    @Override
    @Transactional
    public MemberStudyGroupApply processReply(Long applyId, CreateReplyRequest createReplyRequest, Member requester) {
        // 1. 지원 정보 가져오기
        MemberStudyGroupApply apply = memberStudyGroupApplyRepository.findById(applyId)
                .orElseThrow(() -> new BusinessException(StudyGroupErrorCode.APPLY_NOT_FOUND_ERROR));

        // 2. 그룹장인지 확인
        if (!Objects.equals(requester.getId(), apply.getStudyGroup().getCaptain().getId())) {
            throw new BusinessException(StudyGroupErrorCode.USER_NOT_GROUP_CAPTAIN);
        }
        // 3. status 변경
        apply.setApplicationStatus(createReplyRequest.getApplicationStatus());

        if (createReplyRequest.getApplicationStatus() == ApplicationStatus.APPROVED) {
            // 4. 사용자 - 스터디 그룹 테이블에 데이터 저장
            MemberStudyGroupId memberStudyGroupIdObject = new MemberStudyGroupId(apply.getMember().getId(), apply.getStudyGroup().getId());
            MemberStudyGroup memberStudyGroup = MemberStudyGroup.builder()
                    .memberStudyGroupId(memberStudyGroupIdObject)
                    .member(apply.getMember())
                    .studyGroup(apply.getStudyGroup())
                    .role(StudyGroupRole.MEMBER) // 기본 역할 설정
                    .joinDate(LocalDateTime.now())
                    .isLeaved(false)
                    .build();
            memberStudyGroupRepository.save(memberStudyGroup);
        }
        return apply;
    }

    @Transactional
    @Override
    public StudyGroup updateStudyGroup(Long groupId, UpdateStudyGroupRequest request, Member requester) {
        StudyGroup studyGroup = studyGroupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessException(StudyGroupErrorCode.STUDYGROUP_NOT_FOUND_ERROR));
        Member captain = memberRepository.findById(request.getCaptainId())
                .orElseThrow(() -> new BusinessException(MemberErrorCode.MEMBER_NOT_FOUND_ERROR));
        Image image = imageRepository.findById(request.getImageId())
                .orElseThrow(() -> new BusinessException(FileErrorCode.IMAGE_NOT_FOUND));

        if (!Objects.equals(requester.getId(), captain.getId()))
            throw new BusinessException(StudyGroupErrorCode.USER_NOT_GROUP_CAPTAIN);

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
            studyGroup.setImage(image);
        }
        // 기타 필드에 대해 동일하게 처리
        return studyGroup;
    }

    @Override
    public List<MemberStudyGroup> getMemberListByStudyGroupId(Long studyGroupId) {
        List<MemberStudyGroup> memberStudyGroups = memberStudyGroupRepository.findByMemberStudyGroupIdStudyGroupIdAndIsLeavedFalse(studyGroupId);
        if (memberStudyGroups.isEmpty()) {
            throw new BusinessException(StudyGroupErrorCode.STUDYGROUP_NOT_FOUND_ERROR);
        }
        return memberStudyGroups;
    }

    @Override
    public List<MemberStudyGroupApply> getApplicants(Member requester) {
        // 1. 이 멤버가 그룹장인지 찾기
        List<StudyGroup> GroupList = studyGroupRepository.findByCaptain(requester);
        if (GroupList.isEmpty()) {
            throw new BusinessException(StudyGroupErrorCode.USER_NOT_GROUP_CAPTAIN);
        }
        // 2. 그룹장이라면 그 그룹에 WAITING중인 멤버들을 리스트로 담기
        List<Long> groupIds = GroupList.stream()
                .map(StudyGroup::getId)
                .toList();

        return memberStudyGroupApplyRepository.findByStudyGroupIdInAndApplicationStatus(groupIds, ApplicationStatus.WAITING);
    }

    @Transactional
    @Override
    public StudyGroup deleteStudyGroup(Long groupId) {
        StudyGroup studyGroup = studyGroupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessException(StudyGroupErrorCode.STUDYGROUP_NOT_FOUND_ERROR));
        studyGroup.setIsDeleted(Boolean.TRUE);
        return studyGroup;
    }

    @Transactional
    @Override
    public MemberStudyGroup leaveStudyGroup(Long groupId, Member requester) {

        MemberStudyGroupId memberStudyGroupId = new MemberStudyGroupId(requester.getId(), groupId);

        MemberStudyGroup memberStudyGroup = memberStudyGroupRepository.findById(memberStudyGroupId)
                .orElseThrow(() -> new BusinessException(StudyGroupErrorCode.MEMBER_STUDY_GROUP_NOT_FOUND));

        memberStudyGroup.setIsLeaved(Boolean.TRUE);
        memberStudyGroup.setLeavedDate(LocalDateTime.now());

        return memberStudyGroup;
    }

    @Override
    public List<MemberStudyGroup> getStudyGroupListByMemberId(Member requester) {

        return memberStudyGroupRepository.findByMemberId(requester.getId());
    }
}