package com.nomz.doctorstudy.studygroup.repository;

import com.nomz.doctorstudy.studygroup.dto.StudyGroupSearchFilter;
import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.List;

import static com.nomz.doctorstudy.studygroup.entity.QStudyGroup.studyGroup;
import static com.nomz.doctorstudy.studygroup.entity.QStudyGroupTag.studyGroupTag;
import static com.nomz.doctorstudy.tag.QTag.tag;

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

    public Page<StudyGroup> getStudyGroupList(StudyGroupSearchFilter filter, Pageable pageable){
        JPAQuery<StudyGroup> queryBuilder = query.select(studyGroup).from(studyGroup);

        if(StringUtils.hasText(filter.getTagName())){
            queryBuilder.leftJoin(studyGroup.studyGroupTags, studyGroupTag)
                    .leftJoin(studyGroupTag.tag, tag);
        }

        JPAQuery<StudyGroup> pagedQuery = queryBuilder.where(
                        likeName(filter.getName()),
                        equalMemberCapacity(filter.getMemberCapacity()),
                        likeTagName(filter.getTagName()),
                        isNotDeleted()
                ).offset(pageable.getOffset())
                .limit(pageable.getPageSize());

        long total = queryBuilder.fetch().size(); // 전체 데이터 수 조회
        List<StudyGroup> results = pagedQuery.fetch(); // 페이징된 데이터 조회

        return new PageImpl<>(results, pageable, total);

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

    private BooleanExpression isNotDeleted() {
        return studyGroup.isDeleted.isFalse();
    }
}
