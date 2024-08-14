package com.nomz.doctorstudy.moderator.repository;

import com.nomz.doctorstudy.moderator.dto.ModeratorSearchFilter;
import com.nomz.doctorstudy.moderator.entity.Moderator;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.nomz.doctorstudy.moderator.entity.QModerator.moderator;

@Repository
public class ModeratorQueryRepository {
    private final JPAQueryFactory query;

    public ModeratorQueryRepository(EntityManager em) {
        this.query = new JPAQueryFactory(em);
    }

    public List<Moderator> getModeratorList(ModeratorSearchFilter filter) {
        return query.select(moderator)
                .from(moderator)
                .where(Expressions.asBoolean(false).isTrue()
                        .or(wholeSearch(filter))
                        .or(likeName(filter.getName()))
                        .or(likeDescription(filter.getDescription()))
                )
                .orderBy(moderator.createdAt.desc())
                .limit(filter.getCount())
                .fetch();
    }

    private BooleanExpression wholeSearch(ModeratorSearchFilter filter) {
        if (filter.getName() == null && filter.getDescription() == null) {
            return Expressions.asBoolean(true).isTrue();
        }
        return Expressions.asBoolean(true).isFalse();
    }

    private BooleanExpression likeName(String name) {
        if (name == null) {
            return null;
        }
        return moderator.name.like("%" + name + "%");
    }

    private BooleanExpression likeDescription(String description) {
        if (description == null) {
            return null;
        }
        return moderator.processor.description.like("%" + description + "%");
    }
}
