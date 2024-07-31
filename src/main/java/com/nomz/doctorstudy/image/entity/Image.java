package com.nomz.doctorstudy.image.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(value = {AuditingEntityListener.class})
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "이미지를 업로드해주세요")
    private String imageUrl;

    @ColumnDefault("0")
    private boolean isDeleted;

    @CreatedDate
    private LocalDateTime createdAt;

    @Builder
    public Image(String imageUrl, boolean isDeleted, LocalDateTime createdAt){
        this.imageUrl = imageUrl;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
    }
}
