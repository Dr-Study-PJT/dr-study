package com.nomz.doctorstudy.studygroup.repository;

import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import com.nomz.doctorstudy.studygroup.dto.StudyGroupSearchFilter;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.List;

import static com.nomz.doctorstudy.studygroup.entity.QStudyGroup.studyGroup;

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
        return query.select(studyGroup)
                .from(studyGroup)
                .where(likeName(filter.getName()), equalMemberCapacity(filter.getMemberCapacity()))
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
}
