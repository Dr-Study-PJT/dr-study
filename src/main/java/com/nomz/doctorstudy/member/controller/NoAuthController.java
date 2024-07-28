package com.nomz.doctorstudy.member.controller;

import com.nomz.doctorstudy.common.dto.SuccessResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestController
@RequestMapping("/v1/no-auth")
public class NoAuthController {

    @GetMapping("/test")
    public ResponseEntity<?> NoAuth(){
        return ResponseEntity.ok(
                new SuccessResponse<>("로그인 필요없는 api", null)
        );
    }
}
