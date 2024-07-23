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

export const CustomModeratorStep = ({
    setFocus,
    bodyData,
    setBodyData,
    imageDisplay,
    setImageDisplay,
    handleSubmit,
    register,
    errors,
}: StudyBaseInfoStepProps) => {
    // 포커스할 필드명
    useEffect(() => {
        setFocus('moderator_name');
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
                {...register('moderator_name', {
                    ...formConditions.plainText,
                })}
                errorDisplay={errors?.moderator_name?.message || ''}
                label="AI 사회자 이름"
                onKeyDown={(
                    e: React.KeyboardEvent<
                        HTMLInputElement | HTMLTextAreaElement
                    >,
                ) => handleKeyDownForNextInput(e, 'appearance', setFocus)}
            />
            <InputWithLabelAndError
                {...register('appearance', {
                    ...formConditions.plainText,
                })}
                errorDisplay={errors?.appearance?.message || ''}
                label="외형 타입"
                onKeyDown={(
                    e: React.KeyboardEvent<
                        HTMLInputElement | HTMLTextAreaElement
                    >,
                ) => handleKeyDownForNextInput(e, 'voice', setFocus)}
            />
            <InputWithLabelAndError
                {...register('voice', {
                    ...formConditions.plainText,
                })}
                errorDisplay={errors?.voice?.message || ''}
                label="음성 타입"
                onKeyDown={(
                    e: React.KeyboardEvent<
                        HTMLInputElement | HTMLTextAreaElement
                    >,
                ) => handleKeyDownForNextInput(e, 'tone', setFocus)}
            />
            <InputWithLabelAndError
                {...register('tone', { ...formConditions.plainText })}
                errorDisplay={errors?.tone?.message || ''}
                label="어조 타입"
                onKeyDown={(
                    e: React.KeyboardEvent<
                        HTMLInputElement | HTMLTextAreaElement
                    >,
                ) => handleKeyDownForSubmit(e, handleSubmit)}
            />
        </form>
    );
};
