import React from 'react';
import { Span } from '../../atoms/Span/Span';
import { Box } from '../../atoms/Box/Box';
import { Button, Input } from '@/components/atoms';
import { PlainTextForm } from '@/components/organisms/Forms/PlainTextForm/PlainTextForm';

const CreateFailBottom: React.FC = () => {
  return (
      <Box variant="CreateFailBottom">
          <div>
              <Span variant="b3" color="white">
                  상태 메세지
              </Span>
              {/* <PlainTextForm>

          </PlainTextForm> */}
              <Box variant="createFailBottomMessage">
                  <Span variant="b3" color="white">
                      AI 사회자 프로세서 검증에 실패했습니다.{' '}
                  </Span>
              </Box>
          </div>
          <div className="flex justify-between">
              <Button variant="home">홈으로</Button>
              <Button variant="checkAndTry">확인 후 재시도</Button>
          </div>
      </Box>
  );
};

export default CreateFailBottom;
