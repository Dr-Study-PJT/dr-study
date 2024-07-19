import React, { useEffect } from 'react';
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetFocus,
  useForm,
} from 'react-hook-form';
import { Button } from '@/components/atoms';
import ImageUpload from '@/components/molecules/ImageUpload/ImageUpload';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import Image from 'next/image';
import formConditions from '@/constants/formConditions';
import {
  handleKeyDownForNextInput,
  handleKeyDownForSubmit,
} from '../../../_utils/handleKeyDownForNextInput';

interface Step1Props {
  bodyData: any;
  setBodyData: React.Dispatch<React.SetStateAction<any>>;
  imageDisplay: any;
  setImageDisplay: React.Dispatch<React.SetStateAction<string | null>>;
  handleSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  setFocus: UseFormSetFocus<any>;
}

export const Step1 = ({
  setFocus,
  bodyData,
  setBodyData,
  imageDisplay,
  setImageDisplay,
  handleSubmit,
  register,
  errors,
}: Step1Props) => {
  // 포커스할 필드명
  useEffect(() => {
    setFocus('study_group_name');
  }, [setFocus]);

  // const handleKeyDownForNextInput = (
  //   event: React.KeyboardEvent<HTMLInputElement>,
  // ) => {
  //   if (event.key === 'Enter') {
  //     event.preventDefault(); // 기본 엔터 동작 방지
  //     setFocus('study_goal');
  //   }
  // };

  // const handleKeyDownForSubmit = (
  //   event: React.KeyboardEvent<HTMLInputElement>,
  // ) => {
  //   if (event.key === 'Enter') {
  //     event.preventDefault(); // 기본 엔터 동작 방지
  //     handleSubmit();
  //   }
  // };

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
        onKeyDown={(
          e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => handleKeyDownForNextInput(e, 'study_goal', setFocus)}
      />
      <InputWithLabelAndError
        {...register('study_goal', { ...formConditions.plainText })}
        errorDisplay={errors?.study_goal?.message || ''}
        label="스터디 목표"
        onKeyDown={(
          e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => handleKeyDownForSubmit(e, handleSubmit)}
      />
    </form>
  );
};
