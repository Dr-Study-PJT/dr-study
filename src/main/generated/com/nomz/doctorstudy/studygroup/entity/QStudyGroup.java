package com.nomz.doctorstudy.studygroup.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStudyGroup is a Querydsl query type for StudyGroup
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStudyGroup extends EntityPathBase<StudyGroup> {

    private static final long serialVersionUID = 854359072L;

    public static final QStudyGroup studyGroup = new QStudyGroup("studyGroup");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final StringPath description = createString("description");

    public final DateTimePath<java.time.LocalDateTime> dueDate = createDateTime("dueDate", java.time.LocalDateTime.class);

    public final StringPath goal = createString("goal");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Long> imageId = createNumber("imageId", Long.class);

    public final BooleanPath isDeleted = createBoolean("isDeleted");

    public final NumberPath<Integer> memberCapacity = createNumber("memberCapacity", Integer.class);

    public final NumberPath<Integer> memberCount = createNumber("memberCount", Integer.class);

    public final StringPath name = createString("name");

    public final SetPath<StudyGroupTag, QStudyGroupTag> studyGroupTags = this.<StudyGroupTag, QStudyGroupTag>createSet("studyGroupTags", StudyGroupTag.class, QStudyGroupTag.class, PathInits.DIRECT2);

    public QStudyGroup(String variable) {
        super(StudyGroup.class, forVariable(variable));
    }

    public QStudyGroup(Path<? extends StudyGroup> path) {
        super(path.getType(), path.getMetadata());
    }

    public QStudyGroup(PathMetadata metadata) {
        super(StudyGroup.class, metadata);
    }

}

