package com.nomz.doctorstudy.studygroup.repository;

import com.nomz.doctorstudy.studygroup.entity.MemberStudyGroupApply;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.nomz.doctorstudy.studygroup.entity.QMemberStudyGroupApply.memberStudyGroupApply;

@Repository
public class StudyGroupMemberApplyQueryRepository {
    private final JPAQueryFactory query;

    public StudyGroupMemberApplyQueryRepository(EntityManager em) {
        this.query = new JPAQueryFactory(em);
    }

    public List<MemberStudyGroupApply> findMemberStudyGroupApplyListByCaptainId(Long captainId) {
        return query.select(memberStudyGroupApply)
                .from(memberStudyGroupApply)
                .where(memberStudyGroupApply.studyGroup.captain.id.eq(captainId))
                .fetch();
    }
}
