import React from 'react';
import Image from 'next/image';

import formConditions from '@/constants/formConditions';

import ImageUpload from '@/components/molecules/ImageUpload/ImageUpload';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { formWrapperStyles } from '@/components/molecules/Form/Form.styles';

export const RegisterConfirmStep = ({
    handleSubmit,
    register,
    errors,
    bodyData,
    setBodyData,
    imageDisplay,
    setImageDisplay,
}: any) => {
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
            />
            <InputWithLabelAndError
                {...register('nickname', { ...formConditions.plainText })}
                errorDisplay={errors?.nickname?.message || ''}
                label="닉네임 입력"
            />
            <InputWithLabelAndError
                {...register('password', { ...formConditions.password })}
                errorDisplay={errors?.password?.message || ''}
                label="비밀번호 입력"
                inputType="password"
            />
            <InputWithLabelAndError
                {...register('re_password', { ...formConditions.password })}
                errorDisplay={errors?.re_password?.message || ''}
                label="비밀번호 재입력"
                inputType="password"
            />
        </form>
    );
};
