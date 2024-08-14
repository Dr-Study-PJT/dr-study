package com.nomz.doctorstudy.studygroup.repository;

import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import com.nomz.doctorstudy.studygroup.dto.StudyGroupSearchFilter;
import com.nomz.doctorstudy.tag.Tag;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
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
import static com.nomz.doctorstudy.studygroup.entity.QMemberStudyGroup.memberStudyGroup;

@Repository
public class StudyGroupQueryRepository {
    private final JPAQueryFactory query;

    public StudyGroupQueryRepository(EntityManager em){
        this.query = new JPAQueryFactory(em);
    }

    public List<Tag> getTopRatedTags(int count) {
        return query
                .select(tag)
                .from(studyGroupTag)
                .groupBy(studyGroupTag.tag.id)
                .orderBy(studyGroup.count().desc())
                .limit(count)
                .fetch();
    }

    /**
     * DB에서 조건에 맞는 StudyGroup 들을 검색하고 해당하는 객체 리스트를 반환합니다.
     * @param filter DB 검색에 사용되는 필터 객체
     * @return 조건에 맞는 StudyGroup 리스트를 반환합니다.
     */
    public Page<StudyGroup> getStudyGroupList(StudyGroupSearchFilter filter, Pageable pageable){
        // 기본 쿼리 빌더
        JPAQuery<StudyGroup> baseQuery = query.select(studyGroup).from(studyGroup);

        JPAQuery<StudyGroup> totalGroupsQuery = baseQuery.clone()  // 동일한 쿼리 조건을 가진 클론 사용
                .where(
                        Expressions.asBoolean(false).isTrue()
                                .and(isNotDeleted())
                                .or(equalMemberId(filter.getMemberId()))
                                .or(likeName(filter.getName()))
                                .or(equalMemberCapacity(filter.getMemberCapacity()))
                                .or(likeTagName(filter.getTagName()))
                );
        int totalCount = totalGroupsQuery.fetch().size();
        List<StudyGroup> results = totalGroupsQuery
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(studyGroup.createdAt.desc())
                .fetch();

        return new PageImpl<>(results, pageable, totalCount);
    }


    private BooleanExpression equalMemberId(Long memberId){
        if(memberId != null){
            return studyGroup.id.in(
                    JPAExpressions.select(memberStudyGroup.studyGroup.id)
                            .from(memberStudyGroup)
                            .where(memberStudyGroup.member.id.eq(memberId).and(memberStudyGroup.isLeaved.isFalse()))  // 탈퇴 여부를 체크
            );
        } else {
            return null;
        }
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
