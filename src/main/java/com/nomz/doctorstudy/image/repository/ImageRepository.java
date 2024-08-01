package com.nomz.doctorstudy.image.repository;

import com.nomz.doctorstudy.image.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {

}
