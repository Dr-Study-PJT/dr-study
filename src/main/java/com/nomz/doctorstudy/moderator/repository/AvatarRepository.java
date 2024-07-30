package com.nomz.doctorstudy.moderator.repository;

import com.nomz.doctorstudy.moderator.entity.Avatar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvatarRepository extends JpaRepository<Avatar, Long> {
}
