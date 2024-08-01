package com.nomz.doctorstudy.moderator.controller;

import com.nomz.doctorstudy.common.auth.MemberDetails;
import com.nomz.doctorstudy.common.dto.SuccessResponse;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.moderator.entity.Moderator;
import com.nomz.doctorstudy.moderator.request.CreateModeratorRequest;
import com.nomz.doctorstudy.moderator.response.CreateModeratorResponse;
import com.nomz.doctorstudy.moderator.response.GetModeratorListResponseItem;
import com.nomz.doctorstudy.moderator.response.GetModeratorResponse;
import com.nomz.doctorstudy.moderator.service.ModeratorService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@Validated
@RestController
@RequestMapping("/v1/moderators")
@RequiredArgsConstructor
@Tag(name = "Moderator API", description = "Moderator API 입니다.")
public class ModeratorController {
    private final ModeratorService moderatorService;

    @PostMapping
    private ResponseEntity<SuccessResponse<CreateModeratorResponse>> createModerator(@RequestBody CreateModeratorRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
        Member requester = memberDetails.getUser();

        Long moderatorId = moderatorService.createModerator(requester, request);

        CreateModeratorResponse response = CreateModeratorResponse.builder()
                .id(moderatorId)
                .build();

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Moderator 생성에 성공했습니다.",
                        response
                )
        );
    }

    @GetMapping("/{moderatorId}")
    public ResponseEntity<SuccessResponse<GetModeratorResponse>> getModerator(@PathVariable("moderatorId") Long moderatorId) {
        Moderator moderator = moderatorService.getModerator(moderatorId);

        GetModeratorResponse response = GetModeratorResponse.builder()
                .creatorId(moderator.getCreator().getId())
                .processorId(moderator.getProcessor().getId())
                .avatarId(moderator.getAvatar().getId())
                .createdAt(moderator.getCreatedAt())
                .name(moderator.getName())
                .build();

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Moderator 조회에 성공했습니다.",
                        response
                )
        );
    }


    @GetMapping
    public ResponseEntity<SuccessResponse<List<GetModeratorListResponseItem>>> getModeratorList() {
        List<Moderator> moderatorList = moderatorService.getModeratorList();
        List<GetModeratorListResponseItem> responses = moderatorList.stream().map(GetModeratorListResponseItem::of).toList();

        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Moderator 조회에 성공했습니다.",
                        responses
                )
        );
    }
}
