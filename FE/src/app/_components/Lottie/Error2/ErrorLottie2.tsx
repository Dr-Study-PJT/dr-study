'use client';

import Lottie from 'lottie-react';
import error from './lottie_error2.json';
import { useEffect, useState } from 'react';

export const ErrorLottie2 = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <>
      <Lottie
        style={{
          width: 'w-[20px]',
          height: 'h-[20px]',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 3s ease-out',
        }}
        animationData={error}
        loop={false}
      />
    </>
  );
};
