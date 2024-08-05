'use client';

import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/atoms';
import { StepsBox } from '@/components/molecules/StepsBox/StepsBox';
import { CreateStudyGroupProgressProps } from './CreateStudyGroupProgress.types';
import { StudyBaseInfoStep } from './_component/steps/StudyBaseInfoStep';
import { StudyDetailStep } from './_component/steps/StudyDetailStep';
import { StudyCreateConfirmStep } from './_component/steps/StudyCreateConfirmStep';
import { Box } from '@/components/atoms/Box/Box';

const CreateStudyGroupProgress = ({
  // 하위 컴포넌트에 이벤트를 전달하려면,
  // 이 형식 그대로 가져다가 `progressData` 데이터를 작성해서
  // 컴포넌트 내에서 직접 전달 해야함.
  // (그렇지 않으면 진짜 쓸 수 있는 라이브러리처럼 구현해야 하는데
  // react-hook-form 이랑 연결시켜 구현할 자신이 없음 (너무 어려움))
  steps = 3,
}: CreateStudyGroupProgressProps) => {
  const [bodyData, setBodyData] = useState({
    file: null,
    study_group_name: '',
    study_goal: '',
    max_count: 1,
    goal_date: '',
    study_detail: '',
  });
  const [imageDisplay, setImageDisplay] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const {
    register, // field 등록
    handleSubmit, // form 에서 submit 수행 될 때 실행할 함수를 인자로 전달
    setFocus,
    formState: { errors }, // error 메시지를 다루기 위한 것
  } = useForm<any>();

  const handleNextStep = (data: any) => {
    setBodyData({ ...bodyData, ...data });
    if (currentStep < steps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const requestData = (data: any) => {
    const dateString = data.goal_date;
    const date = new Date(dateString); // 0000-00-00 문자열을 datetime 형식으로 변경
    console.log('bodyData:', { ...bodyData, goal_date: date.toISOString() });
  };

  const progressData = {
    title: '스터디그룹 생성',
    childrenData: [
      {
        subTitle: '스터디 그룹 기본정보를 작성해주세요.',
        component: (
          <StudyBaseInfoStep
            setFocus={setFocus}
            key={1}
            bodyData={bodyData}
            setBodyData={setBodyData}
            imageDisplay={imageDisplay}
            setImageDisplay={setImageDisplay}
            handleSubmit={handleSubmit(handleNextStep)}
            register={register}
            errors={errors}
          />
        ),
      },
      {
        subTitle: '스터디 그룹 상세정보를 작성해주세요.',
        component: (
          <StudyDetailStep
            setFocus={setFocus}
            key={2}
            handleSubmit={handleSubmit(handleNextStep)}
            register={register}
            errors={errors}
          />
        ),
      },
      {
        subTitle: '입력한 스터디 정보가 맞는지 확인해주세요.',
        component: (
          <StudyCreateConfirmStep
            setFocus={setFocus}
            key={3}
            handleSubmit={handleSubmit(handleNextStep)}
            register={register}
            errors={errors}
            bodyData={bodyData}
            setBodyData={setBodyData}
            imageDisplay={imageDisplay}
            setImageDisplay={setImageDisplay}
          />
        ),
      },
    ],
  };

  return (
    <Box variant="createStudyGroupStepBox">
      <StepsBox
        title={progressData.title}
        subTitle={progressData.childrenData[currentStep - 1].subTitle}
        steps={steps}
        currentStep={currentStep}
      >
        <div className="w-full w-">
          {progressData.childrenData[currentStep - 1].component}
        </div>
      </StepsBox>
      <div className="w-full flex justify-end">
        {currentStep > 1 && (
          <Button onClick={() => setCurrentStep(currentStep - 1)}>이전</Button>
        )}
        {currentStep < steps && (
          <Button onClick={handleSubmit(handleNextStep)}>다음</Button>
        )}
        {currentStep === steps && (
          <Button onClick={handleSubmit(requestData)}>완료</Button>
        )}
      </div>
    </Box>
  );
};

export default CreateStudyGroupProgress;