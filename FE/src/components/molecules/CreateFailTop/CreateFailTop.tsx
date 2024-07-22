import { ErrorLottie2 } from '@/app/_components/Lottie/Error2/ErrorLottie2';
import React from 'react';
import { Box } from '../../atoms/Box/Box';
import { Heading } from '@/components/atoms';

const CreateFailTop: React.FC = () => {
  return (
    <Box variant='CreateFailTop'>
        <Box variant='Lottie'>
      <ErrorLottie2 />
      </Box>
      <Heading variant="h3" color='white'>
        AI 사회자 생성 실패
      </Heading>
      </Box>
    
  );
};

export default CreateFailTop;
