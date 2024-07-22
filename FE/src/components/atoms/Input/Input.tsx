import React, { InputHTMLAttributes, forwardRef, useState } from 'react';

import { InputProps } from './Input.types';
import { AtomInputStyles } from './Input.styles';
// import StyledInput from './Input.styles';
import { Label } from '../Label/Label';

// 스타일을 적용한 컴포넌트를 반환

// (수정됨)발생한 에러
// 에러 메시지 : Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
// 이 경고 메시지는 Input 컴포넌트가 ref를 지원하지 않기 때문에 발생합니다. 이를 해결하려면 React.forwardRef를 사용하여 Input 컴포넌트를 ref를 전달할 수 있도록 수정해야 합니다.

// export const Input = ({ placeholder }: InputProps) => {
//   return <input placeholder={placeholder} />;
// };

// forwardRef를 사용하여 ref를 전달할 수 있도록 수정합니다.
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, variant, size, color, border, rounded, shadow, disabled, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={AtomInputStyles({ variant, size, color, border, rounded, shadow, disabled })}
        placeholder={placeholder}
        {...rest}
      />
    );
  }
);

// 디스플레이 네임 설정
Input.displayName = 'Input';
