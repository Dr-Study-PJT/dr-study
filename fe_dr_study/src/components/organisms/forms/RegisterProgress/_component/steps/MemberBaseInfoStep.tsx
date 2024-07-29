// src/components/organisms/forms/RegisterProgress/_component/steps/MemberBaseInfoStep.tsx
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
    useEffect(() => {
        setFocus('email');
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
                id="email"
                label="이메일 입력"
                placeholder="이메일을 입력해주세요."
                {...register('email', {
                    ...formConditions.plainText,
                })}
                error={errors.email}
                onKeyDown={(e) =>
                    handleKeyDownForNextInput(e, 'nickname', setFocus)
                }
            />
            <InputWithLabelAndError
                id="nickname"
                label="닉네임 입력"
                placeholder="닉네임을 입력해주세요."
                {...register('nickname', { ...formConditions.plainText })}
                error={errors.nickname}
                onKeyDown={(e) =>
                    handleKeyDownForNextInput(e, 'password', setFocus)
                }
            />
            <InputWithLabelAndError
                id="password"
                label="비밀번호 입력"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                {...register('password', { ...formConditions.password })}
                error={errors.password}
                onKeyDown={(e) =>
                    handleKeyDownForNextInput(e, 'rePassword', setFocus)
                }
            />
            <InputWithLabelAndError
                id="rePassword"
                label="비밀번호 재입력"
                type="password"
                placeholder="비밀번호를 다시 입력해주세요."
                {...register('rePassword', { ...formConditions.password })}
                error={errors.rePassword}
                onKeyDown={(e) => handleKeyDownForSubmit(e, handleSubmit)}
            />
        </form>
    );
};
