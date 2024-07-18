import React, { InputHTMLAttributes, forwardRef, useState } from 'react';
// import { InputWithLabelAndError } from "./Input.types";
// import StyledInput from "./InputWithLabelAndError.styles";
import { Label, Paragraph, Span } from '@/components/atoms';

// (수정됨)발생한 에러
// 에러 메시지 : Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
// 이 경고 메시지는 Input 컴포넌트가 ref를 지원하지 않기 때문에 발생합니다. 이를 해결하려면 React.forwardRef를 사용하여 Input 컴포넌트를 ref를 전달할 수 있도록 수정해야 합니다.
interface InputWithLabelAndError extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  errordisplay?: any;
}

export const InputWithLabelAndError = forwardRef<
  HTMLInputElement,
  InputWithLabelAndError
>(({ errordisplay, label, placeholder, ...props }, ref) => {
  return (
    <>
      <Label>{label}</Label>
      <StyledInput {...props} ref={ref} placeholder={placeholder} />
      {errordisplay && <Paragraph>{errordisplay.message}</Paragraph>}
    </>
  );
});

InputWithLabelAndError.displayName = 'InputWithLabelAndError';
