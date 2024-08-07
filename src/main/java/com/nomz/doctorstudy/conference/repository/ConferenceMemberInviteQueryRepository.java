package com.nomz.doctorstudy.conference.repository;

import com.nomz.doctorstudy.conference.dto.ConferenceMemberInviteSearchFilter;
import com.nomz.doctorstudy.conference.entity.ConferenceMemberInvite;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.nomz.doctorstudy.conference.entity.QConferenceMemberInvite.conferenceMemberInvite;

@Repository
public class ConferenceMemberInviteQueryRepository {
    private final JPAQueryFactory query;

    public ConferenceMemberInviteQueryRepository(EntityManager em) {
        this.query = new JPAQueryFactory(em);
    }

    public List<ConferenceMemberInvite> getConferenceMemberInviteList(ConferenceMemberInviteSearchFilter filter) {
        return query
                .select(conferenceMemberInvite)
                .from(conferenceMemberInvite)
                .where(eqConference(filter.getConferenceId()), eqInvitee(filter.getInviteeId()))
                .fetch();
    }

    private BooleanExpression eqConference(Long conferenceId) {
        if (conferenceId != null) {
            return conferenceMemberInvite.conference.id.eq(conferenceId);
        }

        return null;
    }

    private BooleanExpression eqInvitee(Long inviteeId) {
        if (inviteeId != null) {
            return conferenceMemberInvite.member.id.eq(inviteeId);
        }
        return null;
    }
}
