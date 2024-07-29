package com.nomz.doctorstudy.moderator.repository;

import com.nomz.doctorstudy.moderator.entity.Moderator;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModeratorRepository extends JpaRepository<Moderator, Long> {
}
