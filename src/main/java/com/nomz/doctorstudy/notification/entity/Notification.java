package com.nomz.doctorstudy.notification.entity;

import com.nomz.doctorstudy.conference.entity.ConferenceMemberInvite;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.notification.NotificationItemType;
import com.nomz.doctorstudy.studygroup.ApplicationStatus;
import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupApply;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@EqualsAndHashCode
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Notification {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "recipient_id", nullable = false)
    private Member recipient;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private NotificationItemType itemType;

    @Column(nullable = false)
    private Long itemId;

    @Column(nullable = false)
    private Boolean isRead;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public void readThis() {
        isRead = true;
    }

    public static Notification of(MemberStudyGroupApply application) {
        Member recipient;
        NotificationItemType notificationItemType;
        if (application.getApplicationStatus() == ApplicationStatus.WAITING) {
            recipient = application.getStudyGroup().getCaptain();
            notificationItemType = NotificationItemType.STUDY_GROUP_APPLICATION;
        }
        else {
            recipient = application.getApplicant();
            notificationItemType = NotificationItemType.STUDY_GROUP_APPLICATION_REPLY;
        }

        return builder()
                .itemType(notificationItemType)
                .recipient(recipient)
                .itemId(application.getId())
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .build();
    }

    public static Notification of(ConferenceMemberInvite invitation) {
        return builder()
                .itemType(NotificationItemType.CONFERENCE_INVITATION)
                .recipient(invitation.getMember())
                .itemId(invitation.getConference().getId())
                .isRead(false)
                .createdAt(LocalDateTime.now())
                .build();
    }
}
