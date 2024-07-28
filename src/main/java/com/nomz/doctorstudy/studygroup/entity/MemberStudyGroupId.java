package com.nomz.doctorstudy.studygroup.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

@Data
@NoArgsConstructor
public class MemberStudyGroupId implements Serializable {
    private Long memberId;
    private Long studyGroupId;

    @Override
    public boolean equals(Object o){
        if(this == o) return true;
        if(o==null || getClass() != o.getClass()) return false;
        MemberStudyGroupId that = (MemberStudyGroupId) o;
        return Objects.equals(memberId, that.memberId) && Objects.equals(studyGroupId, that.studyGroupId);
    }

    @Override
    public int hashCode(){
        return Objects.hash(memberId, studyGroupId);
    }

}
