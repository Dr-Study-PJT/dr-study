// 컴포넌트 타입 작성하세요.

// Form.types.ts
import { ReactNode, FormEvent } from 'react';

export interface FormWrapperProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}
