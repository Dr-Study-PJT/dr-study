package com.nomz.doctorstudy.moderator.service;

import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.moderator.entity.Moderator;
import com.nomz.doctorstudy.moderator.request.CreateModeratorRequest;
import com.nomz.doctorstudy.moderator.request.GetModeratorListRequest;

import java.util.List;

public interface ModeratorService {
    Long createModerator(Member requester, CreateModeratorRequest request);
    Moderator getModerator(Long moderatorId);
    List<Moderator> getModeratorList(GetModeratorListRequest request);
}
