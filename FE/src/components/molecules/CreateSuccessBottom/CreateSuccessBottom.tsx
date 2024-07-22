import React from 'react';
import { Span } from '../../atoms/Span/Span';
import { Box } from '../../atoms/Box/Box';
import { Button } from '@/components/atoms';
import { PlainTextForm } from '@/components/organisms/Forms/PlainTextForm/PlainTextForm';
//실패
export const CreateFailBottom: React.FC = () => {
    return (
        <Box variant="CreateFailBottom">
            <div>
                <Span variant="b3" color="white">
                    상태 메세지
                </Span>
                <PlainTextForm></PlainTextForm>
            </div>
            <div className="flex justify-between">
                <Button variant="home">홈으로</Button>
                <Button variant="checkAndTry">확인 후 재시도</Button>
            </div>
        </Box>
    );
};

//성공
export const CreateSuccessBottom: React.FC = () => {
    return (
        <Box variant="createSuccessOuter">
            <div>
                {/* <Span variant="b3" color="white">
                    상태 메세지
                </Span> */}
                <PlainTextForm></PlainTextForm>
            </div>
            <div className="flex justify-between">
                <Button variant="home">홈으로</Button>
                <Button variant="checkAndTry">확인 후 재시도</Button>
            </div>
        </Box>
    );
};



