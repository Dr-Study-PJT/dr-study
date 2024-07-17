import React from 'react';
import { HeadingProps } from './Heading.types';
import { headingStyles } from './Heading.styles';

// 스타일을 적용한 컴포넌트를 반환

export const Heading = ({
  variant,
  color = 'black',
  children,
}: HeadingProps) => {
  // 타입 any 수정 !필요!
  const Tag = `${variant}` as any; // h1, ~ h6 태그 생성
  return <Tag className={headingStyles({ variant, color })}>{children}</Tag>;
};
