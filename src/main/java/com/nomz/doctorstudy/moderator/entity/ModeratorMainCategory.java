package com.nomz.doctorstudy.moderator.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@Builder(access = AccessLevel.PRIVATE)
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class ModeratorMainCategory {
    @EmbeddedId
    private ModeratorMainCategoryId id;

    @MapsId("moderatorId")
    @ManyToOne
    @JoinColumn(name = "moderator_id")
    private Moderator moderator;

    @MapsId("mainCategoryId")
    @ManyToOne
    @JoinColumn(name = "main_category_id")
    private MainCategory mainCategory;
}
