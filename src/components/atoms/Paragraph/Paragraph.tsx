import React from 'react';
import { ParagraphProps } from './Paragraph.types';

// 스타일을 적용한 컴포넌트를 반환

export const Paragraph = ({ className, children }: ParagraphProps) => {
  return (
    <p className={className} style={{ color: 'red' }}>
      {children}
    </p>
  );
};
