package com.nomz.doctorstudy.notification.entity;

import com.nomz.doctorstudy.conference.entity.ConferenceMemberInvite;
import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.notification.NotificationItemType;
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

    public Notification of(MemberStudyGroupApply application) {
        return builder()
                .itemType(NotificationItemType.STUDY_GROUP_APPLICATION)
                .recipient(application.getMember())
                .itemId(application.getStudyGroup().getId())
                .createdAt(LocalDateTime.now())
                .build();
    }

    public Notification of(ConferenceMemberInvite invitation) {
        return builder()
                .itemType(NotificationItemType.CONFERENCE_INVITATION)
                .recipient(invitation.getMember())
                .itemId(invitation.getConference().getId())
                .createdAt(LocalDateTime.now())
                .build();
    }
}
