// Form.tsx
import React from 'react';

import { FormWrapperProps } from './Form.types';
import { formWrapperStyles } from './Form.styles';

export const Form = ({ variant, onSubmit, children }: FormWrapperProps) => {
  return (
    <form className={formWrapperStyles({ variant })} onSubmit={onSubmit}>
      {children}
    </form>
  );
};
