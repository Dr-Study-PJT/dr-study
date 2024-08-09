package com.nomz.doctorstudy.studygroup.service;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroup;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupApply;
import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import com.nomz.doctorstudy.studygroup.request.*;
import com.nomz.doctorstudy.studygroup.response.GetStudyGroupListResponse;
import com.nomz.doctorstudy.studygroup.response.GetStudyGroupPageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface StudyGroupService {
    // 스터디 그룹 생성
    StudyGroup createStudyGroup(CreateStudyGroupRequest request, Member requester);

    // 스터디 그룹 ID로 조회
    StudyGroup getStudyGroup(Long groupId);

    // 스터디 그룹 조건 검색
    Page<GetStudyGroupPageResponse> getStudyGroupList(GetStudyGroupListRequest command, Pageable pageable);

    // 스터디 그룹 지원 요청 생성
    MemberStudyGroupApply createApply(CreateApplyRequest createApplyRequest, Member requester);

    // 스터디 그룹 지원 요청 조회
    MemberStudyGroupApply getApply(Long userId, Long groupId);

    // 스터디 그룹 지원 응답 처리 + 멤버-스터디그룹 테이블 저장
    MemberStudyGroupApply processReply(Long applyId, CreateReplyRequest createReplyRequest, Member requester);

    // 스터디 그룹 업데이트
    StudyGroup updateStudyGroup(Long groupId, UpdateStudyGroupRequest request, Member requester);

    //스터디 그룹 아이디로 속한 멤버 리스트 찾기
    List<MemberStudyGroup> getMemberListByStudyGroupId(Long studyGroupId);

    //스터디 그룹장이 속한 스터디 그룹의 대기자 리스트 찾기
    List<MemberStudyGroupApply> getApplicants(Member requester);

    // ID로 Study group 삭제 (소프트 삭제)
    StudyGroup deleteStudyGroup(Long groupId, Member requester);

    // 유저가 그룹 ID로 Study group 탈퇴 (소프트 탈퇴)
    MemberStudyGroup leaveStudyGroup(Long groupId, Member requester);

    // 멤버 ID로 스터디 그룹 리스트 찾기
    List<MemberStudyGroup> getStudyGroupListByMemberId(Member requester);
    // Respond to a study group application
    // void respondToStudyGroupApplication(AdmissionResponseRequest admissionResponseRequest);

    // Retrieve all study group applications
    // List<AdmissionResponse> getAllStudyGroupApplications();
}
