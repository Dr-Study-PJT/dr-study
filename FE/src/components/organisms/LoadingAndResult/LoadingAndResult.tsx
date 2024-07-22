
import { Box } from '@/components/atoms/Box/Box';
import CreateFailButtom from '@/components/molecules/CreateFailBottom/CreateFailBottom';
import CreateFailTop from '@/components/molecules/CreateFailTop/CreateFailTop';
import React from 'react';

const CreateError = ({}) => {
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

export default CreateError;
