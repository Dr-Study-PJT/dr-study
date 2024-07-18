import React from 'react';
import { BoxProps } from './Box.types';

// 스타일을 적용한 컴포넌트를 반환하세요.

export const Box = ({ children }: BoxProps) => {
  return <div className="">{children}</div>;
};
