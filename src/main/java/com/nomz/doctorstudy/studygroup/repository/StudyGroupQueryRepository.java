package com.nomz.doctorstudy.studygroup.repository;

import com.nomz.doctorstudy.studygroup.dto.StudyGroupSearchFilter;
import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.List;

import static com.nomz.doctorstudy.studygroup.entity.QStudyGroup.studyGroup;
import static com.nomz.doctorstudy.studygroup.entity.QStudyGroupTag.studyGroupTag;
import static com.nomz.doctorstudy.studygroup.entity.QTag.tag;

@Repository
public class StudyGroupQueryRepository {
    private final JPAQueryFactory query;

    public StudyGroupQueryRepository(EntityManager em){
        this.query = new JPAQueryFactory(em);
    }

    /**
     * DB에서 조건에 맞는 StudyGroup 들을 검색하고 해당하는 객체 리스트를 반환합니다.
     * @param filter DB 검색에 사용되는 필터 객체
     * @return 조건에 맞는 StudyGroup 리스트를 반환합니다.
     */

    public List<StudyGroup> getStudyGroupList(StudyGroupSearchFilter filter){
        JPAQuery<StudyGroup> queryBuilder = query.select(studyGroup).from(studyGroup);

        if(StringUtils.hasText(filter.getTagName())){
            queryBuilder.leftJoin(studyGroup.studyGroupTags, studyGroupTag)
                    .leftJoin(studyGroupTag.tag, tag);
        }

        return queryBuilder.where(
                likeName(filter.getName()),
                equalMemberCapacity(filter.getMemberCapacity()),
                likeTagName(filter.getTagName())
        )
                .fetch();

    }

    private BooleanExpression likeName(String name){
        if (StringUtils.hasText(name)){
            return studyGroup.name.like("%" + name + "%");
        }else{
            return null;
        }
    }
    private BooleanExpression equalMemberCapacity(Integer memberCapacity) {
        if (memberCapacity != null) {
            return studyGroup.memberCapacity.eq(memberCapacity);
        }
        else {
            return null;
        }
    }

    private BooleanExpression likeTagName(String tagName) {
        if (StringUtils.hasText(tagName)) {
            return studyGroup.id.in(
                    JPAExpressions.select(studyGroupTag.studyGroup.id)
                            .from(studyGroupTag)
                            .leftJoin(studyGroupTag.tag, tag)
                            .where(tag.name.like("%" + tagName + "%"))
            );
        } else {
            return null;
        }
    }
}