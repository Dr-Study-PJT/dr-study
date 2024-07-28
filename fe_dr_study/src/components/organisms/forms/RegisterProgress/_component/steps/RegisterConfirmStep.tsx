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
                id="email"
                type="email"
                {...register('email', {
                    ...formConditions.plainText,
                })}
                errorDisplay={errors?.email?.message || ''}
                label="이메일 확인"
                disabled
            />
            <InputWithLabelAndError
                id="nickname"
                type="nickname"
                {...register('nickname', { ...formConditions.plainText })}
                errorDisplay={errors?.nickname?.message || ''}
                label="닉네임 확인"
                disabled
            />
        </form>
    );
};
