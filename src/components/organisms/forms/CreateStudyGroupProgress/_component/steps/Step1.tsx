import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/atoms';
import ImageUpload from '@/components/molecules/ImageUpload/ImageUpload';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import Image from 'next/image';
import formConditions from '@/constants/formConditions';

export const Step1 = ({
  setFocus,
  bodyData,
  setBodyData,
  imageDisplay,
  setImageDisplay,
  handleSubmit,
  register,
  errors,
}: any) => {
  // 포커스할 필드명
  useEffect(() => {
    setFocus('study_group_name');
  }, [setFocus]);

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
    </form>
  );
};
