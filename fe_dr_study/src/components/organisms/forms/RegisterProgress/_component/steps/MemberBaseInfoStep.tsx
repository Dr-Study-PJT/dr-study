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

interface MemberBaseInfoStepProps {
    bodyData: any;
    setBodyData: React.Dispatch<React.SetStateAction<any>>;
    imageDisplay: any;
    setImageDisplay: React.Dispatch<React.SetStateAction<string | null>>;
    handleSubmit: (event?: React.BaseSyntheticEvent) => Promise<void>;
    register: UseFormRegister<any>;
    errors: FieldErrors<any>;
    setFocus: UseFormSetFocus<any>;
}

export const MemberBaseInfoStep = ({
    setFocus,
    bodyData,
    setBodyData,
    imageDisplay,
    setImageDisplay,
    handleSubmit,
    register,
    errors,
}: MemberBaseInfoStepProps) => {
    // 포커스할 필드명
    useEffect(() => {
        setFocus('email');
    }, [setFocus]);

    console.log(handleSubmit);

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
                {...register('email', {
                    ...formConditions.plainText,
                })}
                errorDisplay={errors?.email?.message || ''}
                label="이메일 입력"
                onKeyDown={(
                    e: React.KeyboardEvent<
                        HTMLInputElement | HTMLTextAreaElement
                    >,
                ) => handleKeyDownForNextInput(e, 'nickname', setFocus)}
            />
            <InputWithLabelAndError
                {...register('nickname', { ...formConditions.plainText })}
                errorDisplay={errors?.nickname?.message || ''}
                label="닉네임 입력"
                onKeyDown={(
                    e: React.KeyboardEvent<
                        HTMLInputElement | HTMLTextAreaElement
                    >,
                ) => handleKeyDownForNextInput(e, 'password', setFocus)}
            />
            <InputWithLabelAndError
                {...register('password', { ...formConditions.password })}
                errorDisplay={errors?.password?.message || ''}
                label="비밀번호 입력"
                inputType="password"
                onKeyDown={(
                    e: React.KeyboardEvent<
                        HTMLInputElement | HTMLTextAreaElement
                    >,
                ) => handleKeyDownForNextInput(e, 'rePassword', setFocus)}
            />
            <InputWithLabelAndError
                {...register('rePassword', { ...formConditions.password })}
                errorDisplay={errors?.rePassword?.message || ''}
                label="비밀번호 재입력"
                inputType="password"
                onKeyDown={(
                    e: React.KeyboardEvent<
                        HTMLInputElement | HTMLTextAreaElement
                    >,
                ) => handleKeyDownForSubmit(e, handleSubmit)}
            />
        </form>
    );
};
