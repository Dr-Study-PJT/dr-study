package com.nomz.doctorstudy.studygroup.controller;

import com.nomz.doctorstudy.common.dto.ErrorResponse;
import com.nomz.doctorstudy.common.dto.SuccessResponse;
import com.nomz.doctorstudy.member.Login;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroup;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupApply;
import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import com.nomz.doctorstudy.studygroup.request.*;
import com.nomz.doctorstudy.studygroup.response.*;
import com.nomz.doctorstudy.studygroup.service.StudyGroupService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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
            @Valid @RequestBody CreateStudyGroupRequest request,
            @Parameter(hidden = true) @Login Member requester
    ) {
        log.info("CreateStudyGroupRequest = {}", request);
        StudyGroup studyGroup = studyGroupService.createStudyGroup(request, requester);
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
            @ApiResponse(responseCode = "200", description = "Study Group 조회 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Study Group 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "Study Group 조회에 실패했습니다.",
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
                studyGroup.getImage().getImageUrl(),
                studyGroup.getCreatedAt(),
                studyGroup.getIsDeleted(),
                studyGroup.getDescription(),
                studyGroup.getDueDate(),
                studyGroup.getCaptain().getId(),
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
    public ResponseEntity<SuccessResponse<Page<GetStudyGroupListResponse>>> getStudyGroupList(
            @ParameterObject @ModelAttribute GetStudyGroupListRequest request,
            @RequestParam(name= "page", defaultValue = "1") int page,
            @RequestParam(name= "size", defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page -1, size);
        Page<StudyGroup> studyGroupPage = studyGroupService.getStudyGroupList(request, pageable);
        Page<GetStudyGroupListResponse> responsePage = studyGroupPage.map(GetStudyGroupListResponse::of);

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "StudyGroup 리스트 조회에 성공했습니다.",
                        responsePage
                )
        );
    }
    @PatchMapping("/{groupId}")
    @Operation(summary = "Study Group 업데이트", description = "Study Group 정보를 업데이트합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Study Group 업데이트 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Study Group 업데이트 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "Study Group 업데이트에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """)))
    })
    public ResponseEntity<SuccessResponse<?>> updateStudyGroup(
            @PathVariable("groupId") Long groupId,
            @RequestBody UpdateStudyGroupRequest request,
            @Parameter(hidden = true) @Login Member requester) {
        log.info("UpdateStudyGroupRequest = {}", request);

        // 서비스 호출
        StudyGroup updatedStudyGroup = studyGroupService.updateStudyGroup(groupId, request, requester);

        // service 요청
        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Study Group 업데이트에 성공했습니다.",
                        null
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
            (@Valid @RequestBody CreateApplyRequest request,
             @Parameter(hidden = true) @Login Member requester) {
        MemberStudyGroupApply memberStudyGroupApply = studyGroupService.createApply(request, requester);
        CreateApplyResponse response = new CreateApplyResponse(memberStudyGroupApply.getId());
        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Apply 생성에 성공했습니다.",
                        response
                )
        );
    }
    @GetMapping("/applications")
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
            (@RequestParam("userId") Long userId,
             @RequestParam("groupId") Long groupId){

        // Service 로직
        MemberStudyGroupApply memberStudyGroupApply = studyGroupService.getApply(userId, groupId);
        GetApplyResponse response = GetApplyResponse.of(memberStudyGroupApply);

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
    @PostMapping("/applications/{applyId}/reply")
    public ResponseEntity<SuccessResponse<CreateReplyResponse>> createReply(@PathVariable(name="applyId") Long applyId,
                                                                            @RequestBody CreateReplyRequest createReplyRequest,
                                                                            @Parameter(hidden = true) @Login Member requester) {
        MemberStudyGroupApply memberStudyGroupApply = studyGroupService.processReply(applyId, createReplyRequest, requester);
        CreateReplyResponse response = new CreateReplyResponse(memberStudyGroupApply.getId());
        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "성공적으로 그룹 가입 신청을 처리하였습니다.",
                        response
                )
        );
    }

    @GetMapping("/{groupId}/members")
    @Operation(summary = "Study Group 가입자 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Study Group 가입자 조회 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Study Group 가입자 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "Study Group 가입자 조회에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """)))
    })
    public ResponseEntity<SuccessResponse<List<GetMemberListResponse>>> GetMemberListByStudyGroupId(@PathVariable(name = "groupId") Long groupId) {
        List<MemberStudyGroup> memberList = studyGroupService.getMemberListByStudyGroupId(groupId);
        List<GetMemberListResponse> responseList = memberList.stream().map(GetMemberListResponse::of).toList();

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "StudyGroup 리스트 조회에 성공했습니다.",
                        responseList
                )
        );
    }

    @GetMapping("/applicants")
    @Operation(summary = "Study Group 장이 자신의 그룹에 승인 대기중인 멤버를 조회", description = "Study Group 승인 대기자를 검색합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Study Group 승인 대기자 검색 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Study Group 승인 대기자 검색 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "Study Group 승인 대기자 조회에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """)))
    })
    public ResponseEntity<SuccessResponse<List<GetWaiterListResponse>>> getApplicants(
            @Parameter(hidden = true) @Login Member requester
    ) {
        List<MemberStudyGroupApply> waiterList = studyGroupService.getApplicants(requester);

        List<GetWaiterListResponse> responseList = waiterList.stream()
                .map(GetWaiterListResponse::of)
                .toList();

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "StudyGroup 리스트 조회에 성공했습니다.",
                        responseList
                )
        );
    }
    @DeleteMapping("/{groupId}")
    @Operation(summary = "스터디 그룹 삭제(소프트 삭제)", description = "Study Group을 삭제합니다.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Study Group 삭제 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Study Group 삭제 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                        {
                            "message": "Study Group 삭제에 실패했습니다.",
                            "errors": {
                            }
                        }
                        """)))
    })
    public ResponseEntity<SuccessResponse<DeleteGroupResponse>> deleteStudyGroup(
            @PathVariable(name="groupId") Long groupId,
            @Parameter(hidden = true) @Login Member requester) {
        StudyGroup deletedGroup = studyGroupService.deleteStudyGroup(groupId, requester);
        DeleteGroupResponse response = new DeleteGroupResponse(deletedGroup.getId());
        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "StudyGroup 삭제에 성공했습니다.",
                        response
                )
        );
    }
    @DeleteMapping("/member/{groupId}")
    @Operation(summary = "유저가 스터디 그룹을 탈퇴(소프트 탈퇴)", description = "유저가 스터디 그룹에서 탈퇴합니다.(소프트 탈퇴)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Study Group 탈퇴 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "Study Group 탈퇴 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                        {
                            "message": "Study Group 탈퇴에 실패했습니다.",
                            "errors": {
                            }
                        }
                        """)))
    })
    public ResponseEntity<SuccessResponse<LeaveGroupResponse>> leaveStudyGroup(@PathVariable(name="groupId") Long groupId,
                                                                               @Parameter(hidden = true) @Login Member requester) {
        MemberStudyGroup memberStudyGroup = studyGroupService.leaveStudyGroup(groupId, requester);
        LeaveGroupResponse response = new LeaveGroupResponse(memberStudyGroup.getStudyGroup().getId());
        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "StudyGroup 탈퇴에 성공했습니다.",
                        response
                )
        );
    }

    @GetMapping("/my-groups")
    @Operation(summary = "나의 Study Group 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "나의 Study Group 리스트 조회 성공", useReturnTypeSchema = true),
            @ApiResponse(responseCode = "400", description = "나의 Study Group 리스트 조회 실패", content = @Content(schema = @Schema(implementation = ErrorResponse.class), examples = @ExampleObject("""
                    {
                        "message": "나의 Study Group 리스트 조회에 실패했습니다.",
                        "errors": {
                        }
                    }
                    """)))
    })
    public ResponseEntity<SuccessResponse<List<GetStudyGroupListResponse>>> GetStudyGroupListByMemberId( @Parameter(hidden = true) @Login Member requester) {
        List<MemberStudyGroup> memberStudyGroups  = studyGroupService.getStudyGroupListByMemberId(requester);
        List<GetStudyGroupListResponse> responseList = memberStudyGroups.stream()
                .map(memberStudyGroup -> GetStudyGroupListResponse.of(memberStudyGroup.getStudyGroup()))
                .collect(Collectors.toList());


        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "나의 StudyGroup 리스트 조회에 성공했습니다.",
                        responseList
                )
        );
    }
}