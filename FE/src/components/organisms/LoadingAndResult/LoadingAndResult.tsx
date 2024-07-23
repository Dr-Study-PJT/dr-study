
import { Button } from '@/components/atoms';
import { Box } from '@/components/atoms/Box/Box';
import CreateFailButtom from '@/components/molecules/CreateFailBottom/CreateFailBottom';
import CreateFailTop from '@/components/molecules/CreateFailTop/CreateFailTop';
import { CreateSuccessBottom } from '@/components/molecules/CreateSuccessBottom/CreateSuccessBottom';
import CreateSuccessTop from '@/components/molecules/CreateSuccessTop/CreateSuccessTop';
import React from 'react';
import { CreatingAiLottie } from '../../../app/_components/Lottie/CreatAi/CreateAi';
import { Heading } from '../../atoms/Heading/Heading';
import { Span } from '../../atoms/Span/Span';

export const CreateError = ({}) => {
  return (
      <>
          <Box variant="createError">
              <Box variant="createErrorContainer">
                  <CreateFailTop />

                  <CreateFailButtom />
              </Box>
          </Box>
      </>
  );
};

export const CreateSuccess = ({}) => {
    return (
        <>
            <Box variant="createSuccessOuter">
                <Box variant="createSuccessInner">
                    <Box variant='createSuccessExceptForButton'>
                        <CreateSuccessTop />

                        <CreateSuccessBottom />
                    </Box>
           
                    <Box variant='createSuccessButton'>
                        <Button variant="something">무슨 버튼임?</Button>
                        <Button variant="check">확인</Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export const CreateLoading = ({}) => {
    return (
        <>
            <Box variant="LoadingBox">
                <Box variant="LoadingContents">
                   <CreatingAiLottie/>
                 <Heading variant='h2' color="white">
                     사회자 생성 중
                 </Heading>
                </Box>
            </Box>
        </>
    );
  };
  