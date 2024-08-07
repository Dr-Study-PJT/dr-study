package com.nomz.doctorstudy.moderator.entity;


import com.nomz.doctorstudy.conference.entity.Conference;
import com.nomz.doctorstudy.conference.entity.ConferenceMember;
import com.nomz.doctorstudy.conference.entity.ConferenceMemberId;
import com.nomz.doctorstudy.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@Builder(access = AccessLevel.PRIVATE)
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class ModeratorSubCategory {
    @EmbeddedId
    private ModeratorSubCategoryId id;

    @MapsId("moderatorId")
    @ManyToOne
    @JoinColumn(name = "moderator_id")
    private Moderator moderator;

    @MapsId("subCategoryId")
    @ManyToOne
    @JoinColumn(name = "sub_category_id")
    private SubCategory subCategory;

    private void updateModerator(Moderator moderator) {
        this.moderator = moderator;
    }

    private void updateSubCategory(SubCategory subCategory) {
        this.subCategory = subCategory;
    }

    public static ModeratorSubCategory of(Moderator moderator, SubCategory subCategory) {
        return builder()
                .id(new ModeratorSubCategoryId(moderator.getId(), subCategory.getId()))
                .moderator(moderator)
                .subCategory(subCategory)
                .build();
    }
}
