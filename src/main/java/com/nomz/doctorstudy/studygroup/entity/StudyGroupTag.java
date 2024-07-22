package com.nomz.doctorstudy.studygroup.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;

@Getter
@Entity
@Builder
public class StudyGroupTag {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="studyGroup_id")
    private StudyGroup studyGroup;

}
