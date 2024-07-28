package com.nomz.doctorstudy.studygroup.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemberStudyGroupApply is a Querydsl query type for MemberStudyGroupApply
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberStudyGroupApply extends EntityPathBase<MemberStudyGroupApply> {

    private static final long serialVersionUID = 314046644L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMemberStudyGroupApply memberStudyGroupApply = new QMemberStudyGroupApply("memberStudyGroupApply");

    public final DateTimePath<java.util.Date> createdAt = createDateTime("createdAt", java.util.Date.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.nomz.doctorstudy.member.entity.QMember member;

    public final StringPath message = createString("message");

    public final StringPath status = createString("status");

    public final QStudyGroup studyGroup;

    public QMemberStudyGroupApply(String variable) {
        this(MemberStudyGroupApply.class, forVariable(variable), INITS);
    }

    public QMemberStudyGroupApply(Path<? extends MemberStudyGroupApply> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMemberStudyGroupApply(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMemberStudyGroupApply(PathMetadata metadata, PathInits inits) {
        this(MemberStudyGroupApply.class, metadata, inits);
    }

    public QMemberStudyGroupApply(Class<? extends MemberStudyGroupApply> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.nomz.doctorstudy.member.entity.QMember(forProperty("member")) : null;
        this.studyGroup = inits.isInitialized("studyGroup") ? new QStudyGroup(forProperty("studyGroup")) : null;
    }

}

