package com.nomz.doctorstudy.statistic.response;

import com.nomz.doctorstudy.statistic.dto.MemberStatisticDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GetMemberResponse {
    private Integer totalConferenceTime;
    private List<MemberStatisticDTO> conferences;
    private List<MemberStatisticDTO> studyGroups;
}
