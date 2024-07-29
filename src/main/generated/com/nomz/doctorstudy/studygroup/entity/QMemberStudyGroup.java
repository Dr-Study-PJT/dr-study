package com.nomz.doctorstudy.studygroup.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMemberStudyGroup is a Querydsl query type for MemberStudyGroup
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberStudyGroup extends EntityPathBase<MemberStudyGroup> {

    private static final long serialVersionUID = 183784154L;

    public static final QMemberStudyGroup memberStudyGroup = new QMemberStudyGroup("memberStudyGroup");

    public final BooleanPath isLeaved = createBoolean("isLeaved");

    public final DateTimePath<java.time.LocalDateTime> joinDate = createDateTime("joinDate", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> leavedDate = createDateTime("leavedDate", java.time.LocalDateTime.class);

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public final StringPath role = createString("role");

    public final NumberPath<Long> studyGroupId = createNumber("studyGroupId", Long.class);

    public QMemberStudyGroup(String variable) {
        super(MemberStudyGroup.class, forVariable(variable));
    }

    public QMemberStudyGroup(Path<? extends MemberStudyGroup> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMemberStudyGroup(PathMetadata metadata) {
        super(MemberStudyGroup.class, metadata);
    }

}

