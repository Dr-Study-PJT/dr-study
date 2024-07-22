import React, {
    InputHTMLAttributes,
    TextareaHTMLAttributes,
    forwardRef,
} from 'react';

import { Label, Paragraph } from '@/components/atoms';
import {
    errorStyles,
    inputStyles,
    labelStyles,
} from './InputWithLabelAndError.styles';

// HTMLInputType을 정의합니다.
type HTMLInputType =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';

interface CommonProps {
    textarea: boolean;
    label?: string;
    placeholder?: string;
    errorDisplay?: string;
    inputType?: HTMLInputType;
}

type InputWithLabelAndErrorProps = CommonProps &
    (
        | InputHTMLAttributes<HTMLInputElement>
        | TextareaHTMLAttributes<HTMLTextAreaElement>
    );

export const InputWithLabelAndError = forwardRef<
    HTMLInputElement | HTMLTextAreaElement,
    InputWithLabelAndErrorProps
>((props, ref) => {
    const { textarea, errorDisplay, label, placeholder, inputType, ...rest } =
        props;
    return (
        <div className="w-full relative flex flex-col">
            {label && <Label className={labelStyles()}>{label}</Label>}
            {errorDisplay && (
                <Paragraph className={errorStyles()}>{errorDisplay}</Paragraph>
            )}
            {textarea ? (
                <textarea
                    className={inputStyles()}
                    {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
                    ref={ref as React.Ref<HTMLTextAreaElement>}
                    placeholder={placeholder}
                />
            ) : (
                <input
                    className={inputStyles()}
                    {...(rest as InputHTMLAttributes<HTMLInputElement>)}
                    ref={ref as React.Ref<HTMLInputElement>}
                    placeholder={placeholder}
                    type={inputType} // type을 사용자가 지정할 수 있도록 수정
                />
            )}
        </div>
    );
});

InputWithLabelAndError.displayName = 'InputWithLabelAndError';
