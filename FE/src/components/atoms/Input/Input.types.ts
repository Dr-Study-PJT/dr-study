// 컴포넌트 타입 작성하세요.

import { InputHTMLAttributes, ChangeEvent } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import { AtomInputStyles } from './Input.styles';

export type ButtonType = 'text' | 'password' | 'email'; // 등등등 작성 !필요!

interface IFormValues {
    'First Name': string;
    Age: number;
}

// export interface InputProps {

//   label: Path<IFormValues>;
//   required?: boolean;
//   type?: ButtonType;
//   value: string;
//   placeholder?: string;
//   onChange?: (event: ChangeEvent<HTMLInputElement>) => void; // 함수 타입 작성 !필요!
//   register?: UseFormRegister<IFormValues>; // 임의로 optional 설정해둠!
// }


// 기존 InputHTMLAttributes에서 size 속성을 제거한 새로운 타입을 정의합니다.
type InputAttributesWithoutSize = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

export interface InputProps extends InputAttributesWithoutSize {
  label?: Path<IFormValues>; // 선택적 속성으로 변경
  required?: boolean;
  type?: ButtonType;
  value?: string; // 선택적 속성으로 변경
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void; // 함수 타입 작성
  register?: UseFormRegister<IFormValues>; // optional 설정
  variant?: keyof typeof AtomInputStyles.variants.variant;
  textSize?: keyof typeof AtomInputStyles.variants.textSize;
  color?: keyof typeof AtomInputStyles.variants.color;
  border?: keyof typeof AtomInputStyles.variants.border;
  rounded?: keyof typeof AtomInputStyles.variants.rounded;
  shadow?: keyof typeof AtomInputStyles.variants.shadow;
  disabled?: boolean;
}