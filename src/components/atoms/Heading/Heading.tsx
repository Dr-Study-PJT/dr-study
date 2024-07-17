import React from 'react';
import { HeadingProps } from './Heading.types';

// 스타일을 적용한 컴포넌트를 반환

export const Heading = ({ level, children }: HeadingProps) => {
  const Tag = `h${level}` as any; // h1, ~ h6 태그 생성
  return <Tag>{children}</Tag>;
};
