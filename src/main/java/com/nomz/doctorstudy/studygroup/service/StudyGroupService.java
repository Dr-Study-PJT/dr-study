package com.nomz.doctorstudy.studygroup.service;

import com.nomz.doctorstudy.studygroup.StudyGroup;
import com.nomz.doctorstudy.studygroup.request.AdmissionRequest;
import com.nomz.doctorstudy.studygroup.request.AdmissionResponseRequest;
import com.nomz.doctorstudy.studygroup.request.CreateStudyGroupRequest;
import com.nomz.doctorstudy.studygroup.request.GetStudyGroupListRequest;
import com.nomz.doctorstudy.studygroup.response.AdmissionResponse;

import java.util.List;

public interface StudyGroupService {
    // 스터디 그룹 생성
    StudyGroup createStudyGroup(CreateStudyGroupRequest request);

    // 스터디 그룹 ID로 조회
    StudyGroup getStudyGroup(Long groupId);

    // 스터디 그룹 조건 검색
    List<StudyGroup> getStudyGroupList(GetStudyGroupListRequest command);

    // Update an existing study group
    // StudyGroup updateStudyGroup(Long groupId, StudyGroup studyGroupDetails);


    // Delete a study group by its ID
    // void deleteStudyGroup(Long groupId);

    // Apply for a study group
    // void applyForStudyGroup(AdmissionRequest admissionRequest);

    // Respond to a study group application
    // void respondToStudyGroupApplication(AdmissionResponseRequest admissionResponseRequest);

    // Retrieve all study group applications
    // List<AdmissionResponse> getAllStudyGroupApplications();
}
