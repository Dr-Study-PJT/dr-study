package com.nomz.doctorstudy.moderator.controller;

import com.nomz.doctorstudy.common.auth.MemberDetails;
import com.nomz.doctorstudy.common.dto.SuccessResponse;
import com.nomz.doctorstudy.moderator.request.CreateModeratorRequest;
import com.nomz.doctorstudy.moderator.response.CreateModeratorResponse;
import com.nomz.doctorstudy.moderator.response.GetModeratorResponse;
import com.nomz.doctorstudy.moderator.service.ModeratorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/moderators")
@RequiredArgsConstructor
public class ModeratorController {
    private final ModeratorService moderatorService;
    private final

    @PostMapping
    public ResponseEntity<SuccessResponse<CreateModeratorResponse>> createModerator(@RequestBody CreateModeratorRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MemberDetails memberDetails = (MemberDetails) authentication.getPrincipal();
    }

    @GetMapping("/{moderatorId}")
    public ResponseEntity<SuccessResponse<GetModeratorResponse>> getModerator(@PathVariable Long moderatorId) {
        return ResponseEntity.ok(
                new SuccessResponse<>(
                        "Moderator 조회에 성공했습니다.",
                        moderatorService.getModerator(moderatorId)
                )
        );
    }
}
