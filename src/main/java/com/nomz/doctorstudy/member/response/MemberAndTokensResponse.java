package com.nomz.doctorstudy.member.response;

import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
@Builder
public class MemberAndTokensResponse {
    private MemberInfo memberInfo;
    private Map<String, String> tokens;

}
