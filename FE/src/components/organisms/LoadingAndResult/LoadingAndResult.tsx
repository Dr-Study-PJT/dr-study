
import { Box } from '@/components/atoms/Box/Box';
import CreateFailButtom from '@/components/molecules/CreateFailBottom/CreateFailBottom';
import CreateFailTop from '@/components/molecules/CreateFailTop/CreateFailTop';
import React from 'react';

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
                    <CreateFailTop />

                    <CreateFailButtom />
                </Box>
            </Box>
        </>
    );
};