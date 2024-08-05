package com.nomz.doctorstudy.member.response;

import com.nomz.doctorstudy.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
@Builder
public class MemberAndTokensResponse {
    private MemberResponse memberResponse;
    private Map<String, String> tokens;

}
