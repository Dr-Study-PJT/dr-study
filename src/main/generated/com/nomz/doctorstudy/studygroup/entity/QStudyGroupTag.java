package com.nomz.doctorstudy.studygroup.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QStudyGroupTag is a Querydsl query type for StudyGroupTag
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QStudyGroupTag extends EntityPathBase<StudyGroupTag> {

    private static final long serialVersionUID = 235001690L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QStudyGroupTag studyGroupTag = new QStudyGroupTag("studyGroupTag");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final QStudyGroup studyGroup;

    public final QTag tag;

    public QStudyGroupTag(String variable) {
        this(StudyGroupTag.class, forVariable(variable), INITS);
    }

    public QStudyGroupTag(Path<? extends StudyGroupTag> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QStudyGroupTag(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QStudyGroupTag(PathMetadata metadata, PathInits inits) {
        this(StudyGroupTag.class, metadata, inits);
    }

    public QStudyGroupTag(Class<? extends StudyGroupTag> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.studyGroup = inits.isInitialized("studyGroup") ? new QStudyGroup(forProperty("studyGroup")) : null;
        this.tag = inits.isInitialized("tag") ? new QTag(forProperty("tag")) : null;
    }

}

