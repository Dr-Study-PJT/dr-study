package com.nomz.doctorstudy.studygroup.controller;

import com.nomz.doctorstudy.studygroup.MemberStudyGroupApply;
import com.nomz.doctorstudy.studygroup.StudyGroup;
import com.nomz.doctorstudy.studygroup.repository.StudyGroupRepository;
import com.nomz.doctorstudy.studygroup.request.AdmissionRequest;
import com.nomz.doctorstudy.studygroup.request.AdmissionResponseRequest;
import com.nomz.doctorstudy.studygroup.response.AdmissionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/v1/groups")
public class StudyGroupController {
// Service 사용 X
    @Autowired
    private StudyGroupRepository studyGroupRepository;
    private List<MemberStudyGroupApply> memberStudyGroupApplyList = new ArrayList<>();
//    @Operation(summary = "Create a new study group")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "201", description = "Study group created successfully"),
//            @ApiResponse(responseCode = "400", description = "Invalid input")
//    })
    @PostMapping
    public ResponseEntity<StudyGroup> createStudyGroup(@RequestBody StudyGroup studyGroup) {
        StudyGroup createdGroup = studyGroupRepository.save(studyGroup);
        return new ResponseEntity<>(createdGroup, HttpStatus.CREATED);
    }

//    @Operation(summary = "Update an existing study group")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "Study group updated successfully"),
//            @ApiResponse(responseCode = "404", description = "Study group not found")
//    })
    @PatchMapping("/{groupId}")
    public ResponseEntity<StudyGroup> updateStudyGroup(
            @PathVariable Long groupId,
            @RequestBody StudyGroup studyGroupDetails) {
        StudyGroup existingGroup = studyGroupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("StudyGroup not found"));
        existingGroup.setName(studyGroupDetails.getName());
        existingGroup.setImageId(studyGroupDetails.getImageId());
        existingGroup.setCaptainId(studyGroupDetails.getCaptainId());
        existingGroup.setDescription(studyGroupDetails.getDescription());
        existingGroup.setGoal(studyGroupDetails.getGoal());
        existingGroup.setDueDate(studyGroupDetails.getDueDate());
        existingGroup.setMemberCapacity(studyGroupDetails.getMemberCapacity());
        studyGroupRepository.save(existingGroup);
        return ResponseEntity.ok(existingGroup);
    }

//    @Operation(summary = "Get a study group by ID")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "Study group retrieved successfully"),
//            @ApiResponse(responseCode = "404", description = "Study group not found")
//    })
    @GetMapping("/{groupId}")
    public ResponseEntity<StudyGroup> getStudyGroup(@PathVariable Long groupId) {
        StudyGroup group = studyGroupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("StudyGroup not found"));
        return ResponseEntity.ok(group);
    }

//    @Operation(summary = "Get all study groups")
//    @ApiResponse(responseCode = "200", description = "List of all study groups")
    @GetMapping
    public ResponseEntity<List<StudyGroup>> getAllStudyGroups() {
        List<StudyGroup> groups = studyGroupRepository.findAll();
        return ResponseEntity.ok(groups);
    }

//    @Operation(summary = "Delete a study group by ID")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "Study group deleted successfully"),
//            @ApiResponse(responseCode = "404", description = "Study group not found")
//    })
    @DeleteMapping("/{groupId}")
    public ResponseEntity<Void> deleteStudyGroup(@PathVariable Long groupId) {
        StudyGroup group = studyGroupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("StudyGroup not found"));
        studyGroupRepository.delete(group);
        return ResponseEntity.noContent().build();
    }

//    @Operation(summary = "Apply for a study group")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "201", description = "Application submitted successfully"),
//            @ApiResponse(responseCode = "400", description = "Invalid input")
//    })
    @PostMapping("/admission/apply")
    public ResponseEntity<Void> applyForStudyGroup(@RequestBody AdmissionRequest admissionRequest) {
        MemberStudyGroupApply apply = new MemberStudyGroupApply();
        apply.setMemberId(admissionRequest.getMemberId());
        apply.setStudyGroupId(admissionRequest.getStudyGroupId());
        apply.setMessage(admissionRequest.getMessage());
        apply.setStatus("PENDING");
        apply.setCreatedAt(new java.util.Date());
        memberStudyGroupApplyList.add(apply);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

//    @Operation(summary = "Respond to a study group application")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "Application response recorded"),
//            @ApiResponse(responseCode = "404", description = "Application not found")
//    })
    @PostMapping("/admission/reply")
    public ResponseEntity<Void> respondToStudyGroupApplication(@RequestBody AdmissionResponseRequest admissionResponseRequest) {
        for (MemberStudyGroupApply apply : memberStudyGroupApplyList) {
            if (apply.getId().equals(admissionResponseRequest.getAdmissionId())) {
                apply.setStatus(admissionResponseRequest.isApproved() ? "APPROVED" : "REJECTED");
                return ResponseEntity.ok().build();
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

//    @Operation(summary = "Get all study group applications")
//    @ApiResponse(responseCode = "200", description = "List of all study group applications")
    @GetMapping("/admission")
    public ResponseEntity<List<AdmissionResponse>> getAllStudyGroupApplications() {
        List<AdmissionResponse> responses = new ArrayList<>();
        for (MemberStudyGroupApply apply : memberStudyGroupApplyList) {
            AdmissionResponse response = new AdmissionResponse();
            response.setAdmissionId(apply.getId());
            response.setMemberId(apply.getMemberId());
            response.setStudyGroupId(apply.getStudyGroupId());
            response.setMessage(apply.getMessage());
            response.setApproved("APPROVED".equals(apply.getStatus()));
            responses.add(response);
        }
        return ResponseEntity.ok(responses);
    }

}