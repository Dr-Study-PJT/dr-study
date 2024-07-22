package com.nomz.doctorstudy.studygroup.controller;

import com.nomz.doctorstudy.common.dto.ErrorResponse;
import com.nomz.doctorstudy.common.dto.SuccessResponse;
import com.nomz.doctorstudy.studygroup.MemberStudyGroupApply;
import com.nomz.doctorstudy.studygroup.StudyGroup;
import com.nomz.doctorstudy.studygroup.request.CreateStudyGroupRequest;
import com.nomz.doctorstudy.studygroup.response.CreateStudyGroupResponse;
import com.nomz.doctorstudy.studygroup.response.GetStudyGroupResponse;
import com.nomz.doctorstudy.studygroup.service.StudyGroupService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@Slf4j
@Validated
@RestController
@RequestMapping("/v1/groups")
@RequiredArgsConstructor
@Tag(name ="StudyGroup API", description = "StudyGroup API 입니다.")
public class StudyGroupController {
    private final StudyGroupService studyGroupService;
    private List<MemberStudyGroupApply> memberStudyGroupApplyList = new ArrayList<>();

    @PostMapping
    @Operation(summary = "Study Group 생성", description = "Study Group 정보를 생성합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Study Group 생성 성공"),
            @ApiResponse(responseCode = "400", description = "유효하지 않은 입력", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "유효하지 않은 입력입니다.",
                        "errors": {
                            "title": "제목은 1자이상 64자 이하여야 합니다.",
                            "thumbnailImageId": "썸네일 이미지 아이디는 반드시 포함되어야 합니다."
                        }
                    }
                    """))),
            @ApiResponse(responseCode = "401", description = "인증 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "인증에 실패했습니다.",
                        "errors": { }
                    }
                    """)))
    })
    public ResponseEntity<SuccessResponse<CreateStudyGroupResponse>> createStudyGroup(
            @Valid @RequestBody CreateStudyGroupRequest request
    ) {
        log.info("CreateStudyGroupRequest = {}", request);

        StudyGroup studyGroup = studyGroupService.createStudyGroup(request);
        CreateStudyGroupResponse response = new CreateStudyGroupResponse(studyGroup.getId());
        log.info("CreateStudyGroupResponse = {}", response);
        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "StudyGroup 생성에 성공했습니다.",
                        response
                )
        );
    }

    @GetMapping("/{groupId}")
    @Operation(summary = "Study Group 조회", description = "Study Group 정보를 조회합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Conference 조회 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Conference 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "Conference 조회에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """)))
    })
    public ResponseEntity<SuccessResponse<GetStudyGroupResponse>> getStudyGroup(
            @PathVariable("groupId") Long groupId) {
        StudyGroup studyGroup = studyGroupService.getStudyGroup(groupId);
        GetStudyGroupResponse response = new GetStudyGroupResponse(
                studyGroup.getId(),
                studyGroup.getName(),
                studyGroup.getImageId(),
                studyGroup.getCreatedAt(),
                studyGroup.getIsDeleted(),
                studyGroup.getDescription(),
                studyGroup.getTags(),
                studyGroup.getMemberCount(),
                studyGroup.getMemberCapacity());

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Study Group 조회에 성공했습니다.",
                        response
                )
        );
    }

}



//    @Operation(summary = "Update an existing study group")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "Study group updated successfully"),
//            @ApiResponse(responseCode = "404", description = "Study group not found")
//    })
//    @PatchMapping("/{groupId}")
//    public ResponseEntity<StudyGroup> updateStudyGroup(
//            @PathVariable Long groupId,
//            @RequestBody StudyGroup studyGroupDetails) {
//        StudyGroup existingGroup = studyGroupRepository.findById(groupId)
//                .orElseThrow(() -> new RuntimeException("StudyGroup not found"));
//        existingGroup.setName(studyGroupDetails.getName());
//        existingGroup.setImageId(studyGroupDetails.getImageId());
//        existingGroup.setCaptainId(studyGroupDetails.getCaptainId());
//        existingGroup.setDescription(studyGroupDetails.getDescription());
//        existingGroup.setGoal(studyGroupDetails.getGoal());
//        existingGroup.setDueDate(studyGroupDetails.getDueDate());
//        existingGroup.setMemberCapacity(studyGroupDetails.getMemberCapacity());
//        studyGroupRepository.save(existingGroup);
//        return ResponseEntity.ok(existingGroup);
//    }
//

//
////    @Operation(summary = "Get all study groups")
////    @ApiResponse(responseCode = "200", description = "List of all study groups")
//    @GetMapping
//    public ResponseEntity<List<StudyGroup>> getAllStudyGroups() {
//        List<StudyGroup> groups = studyGroupRepository.findAll();
//        return ResponseEntity.ok(groups);
//    }
//
////    @Operation(summary = "Delete a study group by ID")
////    @ApiResponses(value = {
////            @ApiResponse(responseCode = "200", description = "Study group deleted successfully"),
////            @ApiResponse(responseCode = "404", description = "Study group not found")
////    })
//    @DeleteMapping("/{groupId}")
//    public ResponseEntity<Void> deleteStudyGroup(@PathVariable Long groupId) {
//        StudyGroup group = studyGroupRepository.findById(groupId)
//                .orElseThrow(() -> new RuntimeException("StudyGroup not found"));
//        studyGroupRepository.delete(group);
//        return ResponseEntity.noContent().build();
//    }
//
////    @Operation(summary = "Apply for a study group")
////    @ApiResponses(value = {
////            @ApiResponse(responseCode = "201", description = "Application submitted successfully"),
////            @ApiResponse(responseCode = "400", description = "Invalid input")
////    })
//    @PostMapping("/admission/apply")
//    public ResponseEntity<Void> applyForStudyGroup(@RequestBody AdmissionRequest admissionRequest) {
//        MemberStudyGroupApply apply = new MemberStudyGroupApply();
//        apply.setMemberId(admissionRequest.getMemberId());
//        apply.setStudyGroupId(admissionRequest.getStudyGroupId());
//        apply.setMessage(admissionRequest.getMessage());
//        apply.setStatus("PENDING");
//        apply.setCreatedAt(new java.util.Date());
//        memberStudyGroupApplyList.add(apply);
//        return new ResponseEntity<>(HttpStatus.CREATED);
//    }
//
////    @Operation(summary = "Respond to a study group application")
////    @ApiResponses(value = {
////            @ApiResponse(responseCode = "200", description = "Application response recorded"),
////            @ApiResponse(responseCode = "404", description = "Application not found")
////    })
//    @PostMapping("/admission/reply")
//    public ResponseEntity<Void> respondToStudyGroupApplication(@RequestBody AdmissionResponseRequest admissionResponseRequest) {
//        for (MemberStudyGroupApply apply : memberStudyGroupApplyList) {
//            if (apply.getId().equals(admissionResponseRequest.getAdmissionId())) {
//                apply.setStatus(admissionResponseRequest.isApproved() ? "APPROVED" : "REJECTED");
//                return ResponseEntity.ok().build();
//            }
//        }
//        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//    }
//
////    @Operation(summary = "Get all study group applications")
////    @ApiResponse(responseCode = "200", description = "List of all study group applications")
//    @GetMapping("/admission")
//    public ResponseEntity<List<AdmissionResponse>> getAllStudyGroupApplications() {
//        List<AdmissionResponse> responses = new ArrayList<>();
//        for (MemberStudyGroupApply apply : memberStudyGroupApplyList) {
//            AdmissionResponse response = new AdmissionResponse();
//            response.setAdmissionId(apply.getId());
//            response.setMemberId(apply.getMemberId());
//            response.setStudyGroupId(apply.getStudyGroupId());
//            response.setMessage(apply.getMessage());
//            response.setApproved("APPROVED".equals(apply.getStatus()));
//            responses.add(response);
//        }
//        return ResponseEntity.ok(responses);
//    }
//
//}