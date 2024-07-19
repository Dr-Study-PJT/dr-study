import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/atoms';
import ImageUpload from '@/components/molecules/ImageUpload/ImageUpload';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import Image from 'next/image';
import formConditions from '@/constants/formConditions';

export const Step2 = ({ setFocus, handleSubmit, register, errors }: any) => {
  // 포커스할 필드명
  useEffect(() => {
    setFocus('max_count');
  }, [setFocus]);
  return (
    <form onSubmit={handleSubmit}>
      <InputWithLabelAndError
        type="number"
        min={1}
        // max={maxNumber} 추후에 maxNumber 지정 !필요!
        {...register('max_count', {
          ...formConditions.plainText,
          min: '1',
        })}
        errorDisplay={errors?.max_count?.message || ''}
        label="스터디 그룹 최대 인원수"
      />
      <InputWithLabelAndError
        {...register('goal_date', { ...formConditions.plainText })}
        errorDisplay={errors?.goal_date?.message || ''}
        label="목표 종료 기간"
      />
      <InputWithLabelAndError
        type="textarea"
        {...register('study_detail', { ...formConditions.plainText })}
        errorDisplay={errors?.study_detail?.message || ''}
        label="스터디 그룹 상세내용"
      />
    </form>
  );
};
