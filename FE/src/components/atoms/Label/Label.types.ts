// 컴포넌트 타입 작성하세요.

import { ReactNode } from 'react';

export interface LabelProps {
  className?: string;
  htmlFor?: string;
  children: ReactNode;
}
