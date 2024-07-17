// 컴포넌트 타입 작성하세요.

import { ChangeEvent } from "react";
import { Path, UseFormRegister } from "react-hook-form";

export type ButtonType = "text" | "password" | "email"; // 등등등 작성 !필요!

interface IFormValues {
  "First Name": string;
  Age: number;
}

export interface InputProps {
  label: Path<IFormValues>;
  required?: boolean;
  type?: ButtonType;
  value: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void; // 함수 타입 작성 !필요!
  register: UseFormRegister<IFormValues>;
}
