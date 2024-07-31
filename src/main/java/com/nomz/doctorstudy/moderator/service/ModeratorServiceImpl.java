package com.nomz.doctorstudy.moderator.service;

import com.nomz.doctorstudy.common.exception.BusinessException;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.moderator.ModeratorErrorCode;
import com.nomz.doctorstudy.moderator.entity.Avatar;
import com.nomz.doctorstudy.moderator.entity.Moderator;
import com.nomz.doctorstudy.moderator.entity.Processor;
import com.nomz.doctorstudy.moderator.repository.AvatarRepository;
import com.nomz.doctorstudy.moderator.repository.ModeratorRepository;
import com.nomz.doctorstudy.moderator.repository.ProcessorRepository;
import com.nomz.doctorstudy.moderator.request.CreateModeratorRequest;
import com.nomz.doctorstudy.moderator.response.CreateModeratorResponse;
import com.nomz.doctorstudy.moderator.response.GetModeratorResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ModeratorServiceImpl implements ModeratorService {
    private final ModeratorRepository moderatorRepository;
    private final AvatarRepository avatarRepository;
    private final ProcessorRepository processorRepository;

    @Transactional
    @Override
    public CreateModeratorResponse createModerator(Member requester, CreateModeratorRequest request) {
        Avatar avatar = createAvatar(requester, request);
        Processor processor = createProcessor(requester, request);

        Moderator moderator = Moderator.builder()
                .creator(requester)
                .createdAt(LocalDateTime.now())
                .avatar(avatar)
                .processor(processor)
                .build();

        moderatorRepository.save(moderator);

        return CreateModeratorResponse.builder()
                .id(moderator.getId())
                .build();
    }

    @Override
    public GetModeratorResponse getModerator(Long moderatorId) {
        Moderator moderator = moderatorRepository.findById(moderatorId)
                .orElseThrow(() -> new BusinessException(ModeratorErrorCode.MODERATOR_NOT_FOUND));

        return GetModeratorResponse.builder()
                .creatorId(moderator.getCreator().getId())
                .createdAt(moderator.getCreatedAt())
                .processorId(moderator.getProcessor().getId())
                .avatarId(moderator.getAvatar().getId())
                .build();
    }

    private Avatar createAvatar(Member requester, CreateModeratorRequest request) {
        Avatar avatar = Avatar.builder()
                .creator(requester)
                .createdAt(LocalDateTime.now())
                .voiceType(request.getVoiceType())
                .characterType(request.getCharacterType())
                .modelType(request.getModelType())
                .build();

        avatarRepository.save(avatar);

        return avatar;
    }

    private Processor createProcessor(Member requester, CreateModeratorRequest request) {
        Processor processor = Processor.builder()
                .creator(requester)
                .createdAt(LocalDateTime.now())
                .prePrompt(request.getPrePrompt())
                .script(request.getScript())
                .description(request.getDescription())
                .build();

        processorRepository.save(processor);

        return processor;
    }
}
