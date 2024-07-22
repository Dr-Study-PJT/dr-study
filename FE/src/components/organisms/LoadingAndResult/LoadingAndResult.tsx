
import { Box } from '@/components/atoms/Box/Box';
import CreateFailButtom from '@/components/molecules/CreateFailBottom/CreateFailBottom';
import CreateFailTop from '@/components/molecules/CreateFailTop/CreateFailTop';
import React from 'react';

const LoadingAndResult = ({}) => {
  return (
  
  <>
  <Box variant='LoadingAndResult'>
  <CreateFailTop />
  
  <CreateFailButtom />


  </Box>
  </>
  )
};

export default LoadingAndResult;
