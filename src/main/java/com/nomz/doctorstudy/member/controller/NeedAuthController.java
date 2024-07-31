package com.nomz.doctorstudy.member.controller;

import com.nomz.doctorstudy.common.dto.SuccessResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/need-auth")
public class NeedAuthController {
    @GetMapping("/test")
    public ResponseEntity<?> NoAuth(){
        return ResponseEntity.ok(
                new SuccessResponse<>("로그인 필요한 api", null)
        );
    }

}
