import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/atoms';
import ImageUpload from '@/components/molecules/ImageUpload/ImageUpload';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import Image from 'next/image';
import formConditions from '@/constants/formConditions';

export const Step3 = ({
  handleSubmit,
  register,
  errors,
  bodyData,
  setBodyData,
  imageDisplay,
  setImageDisplay,
}: any) => {
  return (
    <form onSubmit={handleSubmit}>
      <ImageUpload
        bodyData={bodyData}
        setBodyData={setBodyData}
        setImageDisplay={setImageDisplay}
      />
      {imageDisplay && (
        <div className="w-28 h-28">
          <Image
            width={100}
            height={100}
            src={imageDisplay}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <InputWithLabelAndError
        {...register('study_group_name', {
          ...formConditions.plainText,
        })}
        errorDisplay={errors?.study_group_name?.message || ''}
        label="스터디 그룹명"
      />
      <InputWithLabelAndError
        {...register('study_goal', { ...formConditions.plainText })}
        errorDisplay={errors?.study_goal?.message || ''}
        label="스터디 목표"
      />
      <InputWithLabelAndError
        type="number"
        min={1}
        // max={maxNumber} 추후에 maxNumber 지정 !필요!
        {...register('max_count', {
          ...formConditions.plainText,
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
        {...register('study_detail', { ...formConditions.plainText })}
        textarea
        errorDisplay={errors?.study_detail?.message || ''}
        label="스터디 그룹 상세내용"
      />
    </form>
  );
};
