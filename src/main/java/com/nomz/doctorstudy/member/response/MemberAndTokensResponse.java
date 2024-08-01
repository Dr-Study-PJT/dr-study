package com.nomz.doctorstudy.member.response;

import com.nomz.doctorstudy.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.util.Map;

@Getter
@Builder
public class MemberAndTokensResponse {
    private Member member;
    private Map tokens;

}
