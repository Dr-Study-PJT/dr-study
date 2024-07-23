package com.nomz.doctorstudy.studygroup.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Getter
@Entity
@RequiredArgsConstructor
public class StudyGroupTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="studyGroup_id")
    private StudyGroup studyGroup;

    public StudyGroupTag(Tag tag, StudyGroup studyGroup) {
        this.tag = tag;
        this.studyGroup = studyGroup;
    }
}
