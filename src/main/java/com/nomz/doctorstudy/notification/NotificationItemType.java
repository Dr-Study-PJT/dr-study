package com.nomz.doctorstudy.notification;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum NotificationItemType {
    STUDY_GROUP_APPLICATION("Application"),
    CONFERENCE_INVITATION("Invitation")
    ;

    private final String token;
}
