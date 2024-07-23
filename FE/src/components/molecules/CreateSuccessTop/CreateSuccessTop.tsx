import React from 'react';
import { Box } from '../../atoms/Box/Box';
import { Heading } from '@/components/atoms';
import { SuccessLottie } from '@/app/_components/Lottie/Succecc2/SuccessLottie';

const CreateSuccessTop: React.FC = () => {
    return (
        <Box variant="createSuccessTop">
            <Box variant="Lottie">
                <SuccessLottie />
            </Box>
            <Heading variant="h3" color="white">
                AI 사회자 생성 완료
            </Heading>
        </Box>
    );
};

export default CreateSuccessTop;
