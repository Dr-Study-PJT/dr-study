package com.nomz.doctorstudy.studygroup.controller;

import com.nomz.doctorstudy.common.dto.ErrorResponse;
import com.nomz.doctorstudy.common.dto.SuccessResponse;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupApply;
import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
//import com.nomz.doctorstudy.studygroup.request.AdmissionRequest;
import com.nomz.doctorstudy.studygroup.request.CreateApplyRequest;
import com.nomz.doctorstudy.studygroup.request.CreateReplyRequest;
import com.nomz.doctorstudy.studygroup.request.CreateStudyGroupRequest;
import com.nomz.doctorstudy.studygroup.request.GetStudyGroupListRequest;
import com.nomz.doctorstudy.studygroup.response.*;
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
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Validated
@RestController
@RequestMapping("/v1/groups")
@RequiredArgsConstructor
@Tag(name ="StudyGroup API", description = "StudyGroup API 입니다.")
public class StudyGroupController {
    private final StudyGroupService studyGroupService;
    private final List<MemberStudyGroupApply> memberStudyGroupApplyList = new ArrayList<>();

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

        List<String> tags = studyGroup.getStudyGroupTags().stream()
                .map(studyGroupTag -> studyGroupTag.getTag().getName())
                .collect(Collectors.toList());

        GetStudyGroupResponse response = new GetStudyGroupResponse(
                studyGroup.getId(),
                studyGroup.getName(),
                studyGroup.getImageId(),
                studyGroup.getCreatedAt(),
                studyGroup.getIsDeleted(),
                studyGroup.getDescription(),
                studyGroup.getMemberCount(),
                studyGroup.getMemberCapacity(),
                tags
        );

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Study Group 조회에 성공했습니다.",
                        response
                )
        );
    }

    @GetMapping
    @Operation(summary = "Study Group 리스트 조회", description = "Study Group 리스트를 검색합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Study Group 리스트 검색 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Study Group 리스트 검색 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "Study Group 조회에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """)))
    })
    public ResponseEntity<SuccessResponse<List<GetStudyGroupListResponse>>> getStudyGroupList(
            @ParameterObject @ModelAttribute GetStudyGroupListRequest request
    ) {
        GetStudyGroupListRequest command = GetStudyGroupListRequest.builder()
                .name(request.getName())
                .memberCapacity(request.getMemberCapacity())
                .tagName(request.getTagName())
                .build();

        List<StudyGroup> studyGroupList = studyGroupService.getStudyGroupList(command);

        List<GetStudyGroupListResponse> responseList = studyGroupList.stream().map(GetStudyGroupListResponse::of).toList();

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "StudyGroup 리스트 조회에 성공했습니다.",
                        responseList
                )
        );
    }

    @PostMapping("/admission/apply")
    @Operation(summary = "Study Group 지원")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Study Group 리스트 지원 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Study Group 리스트 지원 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "Study Group 지원에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """)))
    })
    public ResponseEntity<SuccessResponse<CreateApplyResponse>> createApply
            (@Valid @RequestBody CreateApplyRequest request) {

        log.info("CreateApplyRequest = {}", request);

        MemberStudyGroupApply memberStudyGroupApply = studyGroupService.createApply(request);
        CreateApplyResponse response = new CreateApplyResponse(memberStudyGroupApply.getId());
        log.info("CreateApplyResponse = {}", response);
        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Apply 생성에 성공했습니다.",
                        response
                )
        );
    }
    @GetMapping("/admission")
    @Operation(summary = "Study Group 지원 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Study Group 지원 조회 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Study Group 지원 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "Study Group 지원 조회에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """)))
    })
    public ResponseEntity<SuccessResponse<GetApplyResponse>> getApply
            (@RequestParam("user_id") Long userId,
             @RequestParam("group_id") Long groupId){

        // Service 로직
        MemberStudyGroupApply memberStudyGroupApply = studyGroupService.getApply(userId, groupId);
        GetApplyResponse response = new GetApplyResponse(
                memberStudyGroupApply.getMember().getId(),
                memberStudyGroupApply.getStudyGroup().getId(),
                memberStudyGroupApply.getStatus(),
                memberStudyGroupApply.getMessage(),
                memberStudyGroupApply.getCreatedAt()
        );
        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Apply 조회에 성공했습니다.",
                        response
                )
        );
    }
    @Operation(summary = "Study Group 지원 Reply")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Study Group 지원 Reply 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Study Group 지원 Reply 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "Study Group 지원 Reply에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """)))
    })
    @PostMapping("/admission/reply")
    public ResponseEntity<SuccessResponse<CreateReplyResponse>> createReply(@RequestBody CreateReplyRequest createReplyRequest) {
        MemberStudyGroupApply memberStudyGroupApply = studyGroupService.processReply(createReplyRequest);
        CreateReplyResponse response = new CreateReplyResponse(memberStudyGroupApply.getId());
        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "성공적으로 그룹 가입 신청을 처리하였습니다.",
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

//

//
//}