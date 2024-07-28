import React, { useEffect } from 'react';

import formConditions from '@/constants/formConditions';

import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { handleKeyDownForNextInput } from '../../../_utils/handleKeyDownForNextInput';
import { formWrapperStyles } from '@/components/molecules/Form/Form.styles';
import ImageUpload from '@/components/molecules/ImageUpload/ImageUpload';
import Image from 'next/image';

export const ConfirmCreateModeratorStep = ({
    setFocus,
    handleSubmit,
    register,
    errors,
    bodyData,
    setBodyData,
    imageDisplay,
    setImageDisplay,
}: any) => {
    // 포커스할 필드명
    useEffect(() => {
        setFocus('max_count');
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
                error={errors?.moderator_name?.message || ''}
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
                error={errors?.appearance?.message || ''}
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
                error={errors?.voice?.message || ''}
                label="음성 타입"
                onKeyDown={(
                    e: React.KeyboardEvent<
                        HTMLInputElement | HTMLTextAreaElement
                    >,
                ) => handleKeyDownForNextInput(e, 'tone', setFocus)}
            />
            <InputWithLabelAndError
                {...register('tone', { ...formConditions.plainText })}
                error={errors?.tone?.message || ''}
                label="어조 타입"
                onKeyDown={(
                    e: React.KeyboardEvent<
                        HTMLInputElement | HTMLTextAreaElement
                    >,
                ) => handleKeyDownForNextInput(e, 'pre_prompt', setFocus)}
            />
            <InputWithLabelAndError
                {...register('pre_prompt', { ...formConditions.plainText })}
                textarea
                error={errors?.pre_prompt?.message || ''}
                label="사전 학습 프롬프트 입력창"
            />
            <div className="w-60 h-60 bg-gray-400">스크래치 컴포넌트</div>
        </form>
    );
};
