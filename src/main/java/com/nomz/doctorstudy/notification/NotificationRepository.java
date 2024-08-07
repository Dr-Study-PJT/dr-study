package com.nomz.doctorstudy.notification;

import com.nomz.doctorstudy.member.entity.Member;
import com.nomz.doctorstudy.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findAllByRecipientAndIsReadIsFalse(Member recipient);
}
