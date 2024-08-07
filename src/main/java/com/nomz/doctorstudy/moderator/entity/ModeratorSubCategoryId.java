package com.nomz.doctorstudy.moderator.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class ModeratorSubCategoryId implements Serializable {
    private Long moderatorId;
    private Long subCategoryId;
}