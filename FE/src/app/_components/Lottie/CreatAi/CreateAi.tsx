'use client';

import Lottie from 'lottie-react';
import createAi from './lottie_create_ai.json';
import { useEffect, useState } from 'react';

export const CreatingAiLottie = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    <>
      <Lottie
        style={{
          width: '100%',
          height: '400px',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 3s ease-out',
        }}
        animationData={createAi}
        loop={true}
      />
    </>
  );
};
