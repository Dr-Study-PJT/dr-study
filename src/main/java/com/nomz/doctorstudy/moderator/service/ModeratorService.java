package com.nomz.doctorstudy.moderator.service;

import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.moderator.request.CreateModeratorRequest;
import com.nomz.doctorstudy.moderator.response.CreateAvatarResponse;
import com.nomz.doctorstudy.moderator.response.CreateModeratorResponse;
import com.nomz.doctorstudy.moderator.response.GetAvatarResponse;
import com.nomz.doctorstudy.moderator.response.GetModeratorResponse;

public interface ModeratorService {
    CreateModeratorResponse createModerator(Member requester, CreateModeratorRequest request);
    GetModeratorResponse getModerator(Long moderatorId);
}
