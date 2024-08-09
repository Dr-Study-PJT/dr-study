package com.nomz.doctorstudy.notification;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum NotificationItemType {
    STUDY_GROUP_APPLICATION("StudyGroupApplication"),
    STUDY_GROUP_APPLICATION_REPLY("StudyGroupApplicationReply"),
    CONFERENCE_INVITATION("ConferenceInvitation")
    ;

    private final String token;
}
