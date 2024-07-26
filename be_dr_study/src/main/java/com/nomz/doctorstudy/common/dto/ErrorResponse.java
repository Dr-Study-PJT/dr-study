package com.nomz.doctorstudy.common.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Map;

/**
 * 요청을 처리하는데에 실패했을 때 반환되는 객체입니다.
 * @param <T> 에러 정보가 담길 객체의 타입
 */
@Getter
@RequiredArgsConstructor
public class ErrorResponse<T> {
    private final String message;
    private final T errors;
}