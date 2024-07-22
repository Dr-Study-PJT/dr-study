import React, { useEffect } from 'react';

import formConditions from '@/constants/formConditions';

import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { formWrapperStyles } from '@/components/molecules/Form/Form.styles';

export const WritePrePromptStep = ({
    setFocus,
    handleSubmit,
    register,
    errors,
}: any) => {
    // 포커스할 필드명
    useEffect(() => {
        setFocus('pre_prompt');
    }, [setFocus]);

    return (
        <form
            className={formWrapperStyles({ variant: 'steps' })}
            onSubmit={handleSubmit}
        >
            <InputWithLabelAndError
                {...register('pre_prompt', { ...formConditions.plainText })}
                textarea
                errorDisplay={errors?.pre_prompt?.message || ''}
                label="사전 학습 프롬프트 입력창"
            />
        </form>
    );
};
