package com.nomz.doctorstudy.studygroup.service;


import com.nomz.doctorstudy.studygroup.entity.StudyGroup;
import com.nomz.doctorstudy.studygroup.exception.StudyGroupErrorCode;
import com.nomz.doctorstudy.studygroup.repository.StudyGroupRepository;
import com.nomz.doctorstudy.common.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
@Aspect
@Component
@RequiredArgsConstructor
public class StudyGroupCheckAspect {

    private final StudyGroupRepository studyGroupRepository;

    @Before("execution(* com.nomz.doctorstudy.studygroup.service..*(..)) && args(groupId,..) && !execution(* com.nomz.doctorstudy.studygroup.service.StudyGroupService.processReply(..))")
    public void checkStudyGroupDeleted(Long groupId){
        StudyGroup studyGroup = studyGroupRepository.findById(groupId)
                .orElseThrow(() -> new BusinessException(StudyGroupErrorCode.STUDYGROUP_NOT_FOUND_ERROR));

        if(studyGroup.getIsDeleted()){
         throw new BusinessException(StudyGroupErrorCode.STUDYGROUP_NOT_FOUND_ERROR);
        }
    }
}
