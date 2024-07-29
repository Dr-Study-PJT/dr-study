package com.nomz.doctorstudy.moderator.service;

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

@Service
@RequiredArgsConstructor
public class ModeratorServiceImpl implements ModeratorService {
    private final ModeratorRepository moderatorRepository;
    private final AvatarRepository avatarRepository;
    private final ProcessorRepository processorRepository;

    @Override
    public CreateModeratorResponse createModerator(CreateModeratorRequest request) {
        avatarService.createAvatar(new CreateAvatarRequest(
                request.getVoiceType(),
                request.getCharacterType(),
                request.getScript()
        ));

        Processor processor = Processor.builder()
                .;
        processorService.;

        Moderator moderator = Moderator.builder()
                .avatar(avatar)
                .processor(processor)
                .build();

        return CreateModeratorResponse.builder()
                .id(moderator.getId())
                .build();
    }

    @Override
    public GetModeratorResponse getModerator(Long moderatorId) {

        return null;
    }

    private Avatar createAvatar(CreateModeratorRequest request) {
        Avatar avatar = Avatar.builder()
                .voiceType(request.getVoiceType())
                .characterType(request.getCharacterType())
                .modelType(request.getModelType())
                .build();

        avatarRepository.save(avatar);


    }
}
