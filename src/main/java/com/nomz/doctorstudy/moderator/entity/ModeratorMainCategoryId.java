package com.nomz.doctorstudy.moderator.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class ModeratorMainCategoryId implements Serializable {
    private Long moderatorId;
    private Long mainCategoryId;
}