'use client';

import { useEffect } from 'react';

export const MSWComponent = () => {
  useEffect(() => {
    // window가 존재하는 경우에 동작 => 브라우저에서만 동작
    if (typeof window !== 'undefined') {
      if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
        require('@/mocks/browser');
      }
    }
  }, []);

  return null;
};
