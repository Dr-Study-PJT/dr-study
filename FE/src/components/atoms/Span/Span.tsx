import React from 'react';

import { SpanProps } from './Span.types';
import { spanStyles } from './Span.styles';

export const Span = ({ customized, variant, color = 'black', children }: SpanProps) => {
  return <span className={spanStyles({ customized, variant, color })}>{children}</span>;
};
