import React from 'react';
import { SpanProps } from './Span.types';
import { spanStyles } from './Span.styles';

export const Span = ({ variant, color = 'black', children }: SpanProps) => {
  return <span className={spanStyles({ variant, color })}>{children}</span>;
};
