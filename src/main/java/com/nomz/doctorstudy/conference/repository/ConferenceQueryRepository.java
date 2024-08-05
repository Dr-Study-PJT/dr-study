package com.nomz.doctorstudy.conference.repository;

import com.nomz.doctorstudy.conference.entity.Conference;
import com.nomz.doctorstudy.conference.dto.ConferenceSearchFilter;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import static com.nomz.doctorstudy.conference.entity.QConference.conference;
import static com.nomz.doctorstudy.studygroup.entity.QMemberStudyGroup.memberStudyGroup;

import java.time.LocalDateTime;
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
                .where(
                        eqStudyGroupMember(filter.getMemberId()),
                        eqStudyGroup(filter.getStudyGroupId()),
                        dateInBound(filter.getLowerBoundDate(), filter.getUpperBoundDate())
                )
                .fetch();
    }

    private BooleanExpression eqStudyGroupMember(Long memberId) {
        if (memberId != null) {
            List<Long> studyGroupIds = query
                    .select(memberStudyGroup.studyGroup.id)
                    .from(memberStudyGroup)
                    .where(memberStudyGroup.member.id.eq(memberId))
                    .fetch();

            return conference.studyGroup.id.in(studyGroupIds);
        }
        return null;
    }

    private BooleanExpression eqStudyGroup(Long studyGroupId) {
        if (studyGroupId != null) {
            return conference.studyGroup.id.eq(studyGroupId);
        }
        return null;
    }

    private BooleanExpression dateInBound(LocalDateTime lowerBoundDate, LocalDateTime upperBoundDate) {
        if (lowerBoundDate != null) {
            return conference.finishTime.before(lowerBoundDate).or(conference.startTime.after(upperBoundDate)).not();
        }
        return null;
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
