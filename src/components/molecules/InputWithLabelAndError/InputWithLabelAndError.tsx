import React, {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
} from 'react';
// import { InputWithLabelAndError } from "./Input.types";
// import StyledInput from "./InputWithLabelAndError.styles";
import { Label, Paragraph } from '@/components/atoms';
import {
  errorStyles,
  inputStyles,
  labelStyles,
} from './InputWithLabelAndError.styles';

// (더 이상 쓰이지 않는 타입)발생한 에러
// 에러 메시지 : Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
// 이 경고 메시지는 Input 컴포넌트가 ref를 지원하지 않기 때문에 발생합니다. 이를 해결하려면 React.forwardRef를 사용하여 Input 컴포넌트를 ref를 전달할 수 있도록 수정해야 합니다.
// interface InputWithLabelAndError extends InputHTMLAttributes<HTMLInputElement> {
//   textarea: boolean;
//   label?: string;
//   placeholder?: string;
//   errorDisplay?: string;
// }

interface CommonProps {
  textarea: boolean;
  label?: string;
  placeholder?: string;
  errorDisplay?: string;
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
  const { textarea, errorDisplay, label, placeholder, ...rest } = props;
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
        />
      )}
    </div>
  );
});

InputWithLabelAndError.displayName = 'InputWithLabelAndError';
