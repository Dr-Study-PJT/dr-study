package com.nomz.doctorstudy.studygroup.service;

import com.nomz.doctorstudy.studygroup.MemberStudyGroupApply;
import com.nomz.doctorstudy.studygroup.StudyGroup;
import com.nomz.doctorstudy.studygroup.repository.MemberStudyGroupApplyRepository;
import com.nomz.doctorstudy.studygroup.repository.StudyGroupRepository;
import com.nomz.doctorstudy.studygroup.request.AdmissionRequest;
import com.nomz.doctorstudy.studygroup.request.AdmissionResponseRequest;
import com.nomz.doctorstudy.studygroup.response.AdmissionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudyGroupServiceImpl implements StudyGroupService {

    @Autowired
    private StudyGroupRepository studyGroupRepository;

    @Autowired
    private MemberStudyGroupApplyRepository memberStudyGroupApplyRepository;

    @Override
    public StudyGroup createStudyGroup(StudyGroup studyGroup) {
        return studyGroupRepository.save(studyGroup);
    }

    @Override
    public StudyGroup updateStudyGroup(Long groupId, StudyGroup studyGroupDetails) {
        StudyGroup existingStudyGroup = studyGroupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("StudyGroup not found"));

        existingStudyGroup.setName(studyGroupDetails.getName());
        existingStudyGroup.setImageId(studyGroupDetails.getImageId());
        existingStudyGroup.setCaptainId(studyGroupDetails.getCaptainId());
        existingStudyGroup.setDescription(studyGroupDetails.getDescription());
        existingStudyGroup.setGoal(studyGroupDetails.getGoal());
        existingStudyGroup.setDueDate(studyGroupDetails.getDueDate());
        existingStudyGroup.setMemberCapacity(studyGroupDetails.getMemberCapacity());

        return studyGroupRepository.save(existingStudyGroup);
    }

    @Override
    public StudyGroup getStudyGroup(Long groupId) {
        return studyGroupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("StudyGroup not found"));
    }

    @Override
    public List<StudyGroup> getAllStudyGroups() {
        return studyGroupRepository.findAll();
    }

    @Override
    public void deleteStudyGroup(Long groupId) {
        StudyGroup existingStudyGroup = studyGroupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("StudyGroup not found"));
        studyGroupRepository.delete(existingStudyGroup);
    }

    @Override
    public void applyForStudyGroup(AdmissionRequest admissionRequest) {
        // Handle the application process
        MemberStudyGroupApply apply = new MemberStudyGroupApply();
        apply.setMemberId(admissionRequest.getMemberId());
        apply.setStudyGroupId(admissionRequest.getStudyGroupId());
        apply.setMessage(admissionRequest.getMessage());
        apply.setStatus("PENDING"); // Initial status
        apply.setCreatedAt(new java.util.Date());
        memberStudyGroupApplyRepository.save(apply);
    }

    @Override
    public void respondToStudyGroupApplication(AdmissionResponseRequest admissionResponseRequest) {
        // Handle the response to application
        MemberStudyGroupApply apply = memberStudyGroupApplyRepository.findById(admissionResponseRequest.getAdmissionId())
                .orElseThrow(() -> new RuntimeException("Application not found"));

        apply.setStatus(admissionResponseRequest.isApproved() ? "APPROVED" : "REJECTED");
        memberStudyGroupApplyRepository.save(apply);
    }

    @Override
    public List<AdmissionResponse getAllStudyGroupApplications() {
        // Retrieve all applications
        List<MemberStudyGroupApply> applications = memberStudyGroupApplyRepository.findAll();
        return applications.stream().map(application -> {
            AdmissionResponse response = new AdmissionResponse();
            response.setAdmissionId(application.getId());
            response.setMemberId(application.getMemberId());
            response.setStudyGroupId(application.getStudyGroupId());
            response.setMessage(application.getMessage());
            response.setApproved("APPROVED".equals(application.getStatus()));
            return response;
        }).collect(Collectors.toList());
    }
}