package com.nomz.doctorstudy.studygroup.service;

import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupApply;
import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import com.nomz.doctorstudy.studygroup.request.CreateApplyRequest;
import com.nomz.doctorstudy.studygroup.request.CreateReplyRequest;
import com.nomz.doctorstudy.studygroup.request.CreateStudyGroupRequest;
import com.nomz.doctorstudy.studygroup.request.GetStudyGroupListRequest;

import java.util.List;

public interface StudyGroupService {
    // 스터디 그룹 생성
    StudyGroup createStudyGroup(CreateStudyGroupRequest request);

    // 스터디 그룹 ID로 조회
    StudyGroup getStudyGroup(Long groupId);

    // 스터디 그룹 조건 검색
    List<StudyGroup> getStudyGroupList(GetStudyGroupListRequest command);

    // 스터디 그룹 지원 요청 생성
    MemberStudyGroupApply createApply(CreateApplyRequest createApplyRequest);

    // 스터디 그룹 지원 요청 조회
    MemberStudyGroupApply getApply(Long userId, Long groupId);

    // 스터디 그룹 지원 응답 처리 + 멤버-스터디그룹 테이블 저장
    MemberStudyGroupApply processReply(CreateReplyRequest createReplyRequest);

    // Update an existing study group
    // StudyGroup updateStudyGroup(Long groupId, StudyGroup studyGroupDetails);


    // Delete a study group by its ID
    // void deleteStudyGroup(Long groupId);


    // Respond to a study group application
    // void respondToStudyGroupApplication(AdmissionResponseRequest admissionResponseRequest);

    // Retrieve all study group applications
    // List<AdmissionResponse> getAllStudyGroupApplications();
}
