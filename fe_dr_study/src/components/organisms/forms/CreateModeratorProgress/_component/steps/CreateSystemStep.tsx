import React from 'react';
import Image from 'next/image';

import formConditions from '@/constants/formConditions';

import ImageUpload from '@/components/molecules/ImageUpload/ImageUpload';
import { InputWithLabelAndError } from '@/components/molecules/InputWithLabelAndError/InputWithLabelAndError';
import { formWrapperStyles } from '@/components/molecules/Form/Form.styles';

export const CreateSystemStep = ({
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
            <div className="w-60 h-60 bg-gray-400">스크래치 컴포넌트</div>
        </form>
    );
};
