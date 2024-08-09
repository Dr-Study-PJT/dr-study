package com.nomz.doctorstudy.statistic.service;

import com.nomz.doctorstudy.statistic.dto.MemberStatisticDTO;

import java.util.List;

public interface StatisticService {
    MemberStatisticDTO getMemberStatistic(Long userId);
}
