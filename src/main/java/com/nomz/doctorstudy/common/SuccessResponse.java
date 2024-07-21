package com.nomz.doctorstudy.common;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

/**
 * 요청을 성공적으로 처리했을 때 반환되는 객체입니다.
 * @param <T> 요청받은 정보가 담길 객체의 타입
 */
@Getter
@RequiredArgsConstructor
public class SuccessResponse<T> {
    @Schema(description = "응답 메시지")
    private final String message;
    @Schema(description = "응답 데이터")
    private final T data;
}