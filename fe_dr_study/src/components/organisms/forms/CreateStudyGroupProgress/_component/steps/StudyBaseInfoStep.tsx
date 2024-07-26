import React, { useEffect } from 'react';
import { FieldErrors, UseFormRegister, UseFormSetFocus } from 'react-hook-form';
import Image from 'next/image';

import formConditions from '@/constants/formConditions';

import ImageUpload from '@/components/molecules/ImageUpload/ImageUpload';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import {
  handleKeyDownForNextInput,
  handleKeyDownForSubmit,
} from '@/components/organisms/forms/_utils/handleKeyDownForNextInput';
import { formWrapperStyles } from '@/components/molecules/Form/Form.styles';

interface StudyBaseInfoStepProps {
  bodyData: any;
  setBodyData: React.Dispatch<React.SetStateAction<any>>;
  imageDisplay: any;
  setImageDisplay: React.Dispatch<React.SetStateAction<string | null>>;
  handleSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  setFocus: UseFormSetFocus<any>;
}

export const StudyBaseInfoStep = ({
  setFocus,
  bodyData,
  setBodyData,
  imageDisplay,
  setImageDisplay,
  handleSubmit,
  register,
  errors,
}: StudyBaseInfoStepProps) => {
  useEffect(() => {
    setFocus('study_group_name');
  }, [setFocus]);

  return (
    <form
      className={formWrapperStyles({ variant: 'steps' })}
      onSubmit={handleSubmit}
    >
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
        textarea={false} 
        {...register('study_group_name', {
          ...formConditions.plainText,
        })}
        errorDisplay={errors.study_group_name?.message || undefined} 
        label="스터디 그룹명"
        onKeyDown={(
          e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => handleKeyDownForNextInput(e, 'study_goal', setFocus)}
      />
      <InputWithLabelAndError
        textarea={false} 
        {...register('study_goal', { ...formConditions.plainText })}
        errorDisplay={errors.study_goal?.message || undefined} 
        label="스터디 그룹 목표"
        onKeyDown={(
          e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => handleKeyDownForSubmit(e, handleSubmit)}
      />
    </form>
  );
};
