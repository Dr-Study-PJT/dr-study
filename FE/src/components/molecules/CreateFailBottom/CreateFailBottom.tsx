import React from 'react';
import { Span } from '../../atoms/Span/Span';
import { Box } from '../../atoms/Box/Box';
import { Button } from '@/components/atoms';

const CreateFailBottom: React.FC = () => {
  return (
    <Box variant='CreateFailBottom'>
      <Span variant='b3' color='white'>상태 메세지</Span>
      <div className='flex justify-between'>
        <Button variant='home'>홈으로</Button>
        <Button variant='checkAndTry'>확인 후 재시도</Button>
      </div>
    </Box>
  );
};

export default CreateFailBottom;
