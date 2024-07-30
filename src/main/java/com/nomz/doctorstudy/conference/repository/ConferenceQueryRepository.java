package com.nomz.doctorstudy.conference.repository;

import com.nomz.doctorstudy.conference.entity.Conference;
import com.nomz.doctorstudy.conference.dto.ConferenceSearchFilter;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import static com.nomz.doctorstudy.conference.entity.QConference.conference;

import java.util.List;

@Repository
public class ConferenceQueryRepository {
    private final JPAQueryFactory query;

    public ConferenceQueryRepository(EntityManager em) {
        this.query = new JPAQueryFactory(em);
    }

    /**
     * DB에서 조건에 맞는 Conference들을 검색하고 해당하는 객체 리스트를 반환합니다.
     * @param filter DB 검색에 사용되는 필터 객체
     * @return 조건에 맞는 Conference 리스트를 반환합니다.
     */
    public List<Conference> getConferenceList(ConferenceSearchFilter filter) {
        return query.select(conference)
                .from(conference)
                .where(likeTitle(filter.getTitle()), equalMemberCapacity(filter.getMemberCapacity()))
                .fetch();
    }

    private BooleanExpression likeTitle(String title) {
        if (StringUtils.hasText(title)) {
            return conference.title.like("%" + title + "%");
        }
        else {
            return null;
        }
    }

    private BooleanExpression equalMemberCapacity(Integer memberCapacity) {
        if (memberCapacity != null) {
            return conference.memberCapacity.eq(memberCapacity);
        }
        else {
            return null;
        }
    }
}
