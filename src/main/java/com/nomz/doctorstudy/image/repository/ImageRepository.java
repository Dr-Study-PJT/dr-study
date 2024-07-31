package com.nomz.doctorstudy.image.repository;

import com.nomz.doctorstudy.image.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {

}
