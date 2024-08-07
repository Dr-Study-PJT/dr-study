package com.nomz.doctorstudy.notification;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum NotificationItemType {
    STUDY_GROUP_APPLICATION("StudyGroup Application"),
    CONFERENCE_INVITATION("Conference Invitation")
    ;

    private final String token;
}
