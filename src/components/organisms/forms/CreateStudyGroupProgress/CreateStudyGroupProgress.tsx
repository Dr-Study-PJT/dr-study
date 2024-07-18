'use client';

import { Button } from '@/components/atoms';
import ImageUpload from '@/components/molecules/ImageUpload/ImageUpload';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { StepsBox } from '@/components/molecules/StepsBox/StepsBox';
import React, { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import formConditions from '@/constants/formConditions';

interface CreateStudyGroupProgressProps {
  title?: string;
  subTitle?: string;
  steps?: number;
  displayComponents: ReactNode[];
}

const CreateStudyGroupProgress = ({
  title = '제목',
  subTitle = '부제목',
  steps = 3,
  displayComponents = [],
}: CreateStudyGroupProgressProps) => {
  const [bodyData, setBodyData] = useState({
    img_url: '',
    study_group_name: '',
    study_goal: '',
    max_count: 1,
    goal_date: '',
    study_detail: '',
  });
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isValid, setIsValid] = useState<boolean>(false);

  // 다음으로 가기 전 입력 검증단계? 어떻게하지?
  const checkIsValidStep = () => {};

  const {
    register, // field 등록
    handleSubmit, // form 에서 submit 수행 될 때 실행할 함수를 인자로 전달
    formState: { errors }, // error 메시지를 다루기 위한 것
  } = useForm<any>();

  const handleNextStep = (data: any) => {
    console.log(bodyData, data);
    setBodyData({ ...data, ...bodyData });
    if (currentStep < steps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const T1 = () => (
    <form onSubmit={handleSubmit(handleNextStep)}>
      <ImageUpload bodyData={bodyData} setBodyData={setBodyData} />
      <InputWithLabelAndError
        {...register('study_group_name', {
          ...formConditions.plainText,
        })}
        // errorDisplay 타입 에러 해결 !필요!
        errorDisplay={errors?.study_group_name?.message || ''}
        label="스터디 그룹명"
      />
      <InputWithLabelAndError
        {...register('study_goal', { ...formConditions.plainText })}
        errorDisplay={errors?.study_goal?.message || ''}
        label="스터디 목표"
      />
      <Button>검증</Button>
    </form>
  );
  const T2 = () => (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <InputWithLabelAndError
        {...register('max_count', {
          ...formConditions.plainText,
        })}
        // errorDisplay 타입 에러 해결 !필요!
        errorDisplay={errors?.max_count?.message || ''}
        label="스터디 그룹 최대 인원수"
      />
      <InputWithLabelAndError
        {...register('goal_date', { ...formConditions.plainText })}
        errorDisplay={errors?.goal_date?.message || ''}
        label="목표 종료 기간"
      />
      <InputWithLabelAndError
        {...register('study_detail', { ...formConditions.plainText })}
        errorDisplay={errors?.study_detail?.message || ''}
        label="스터디 그룹 상세내용"
      />
      <Button>검증</Button>
    </form>
  );
  const T3 = () => (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <InputWithLabelAndError
        {...register('max_count', {
          ...formConditions.plainText,
        })}
        // errorDisplay 타입 에러 해결 !필요!
        errorDisplay={errors?.max_count?.message || ''}
        label="스터디 그룹 최대 인원수"
      />
      <InputWithLabelAndError
        {...register('goal_date', { ...formConditions.plainText })}
        errorDisplay={errors?.goal_date?.message || ''}
        label="목표 종료 기간"
      />
      <InputWithLabelAndError
        {...register('study_detail', { ...formConditions.plainText })}
        errorDisplay={errors?.study_detail?.message || ''}
        label="스터디 그룹 상세내용"
      />
      <Button>검증</Button>
    </form>
  );

  const tempDisplayComponents = [<T1 />, <T2 />, <T3 />];
  return (
    <div>
      <StepsBox
        currentStep={currentStep}
        title={title}
        subTitle={subTitle}
        steps={3}
      >
        {tempDisplayComponents[currentStep - 1]}
        {/* 입력완료 버튼을 두고 -> 검증완료 시 다음으로 가능하도록? */}
        <Button onClick={handleNextStep}>다음으로</Button>
      </StepsBox>
    </div>
  );
};

export default CreateStudyGroupProgress;
