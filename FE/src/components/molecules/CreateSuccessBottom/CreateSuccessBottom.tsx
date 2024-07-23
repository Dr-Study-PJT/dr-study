import React from 'react';
import { Span } from '../../atoms/Span/Span';
import { Box } from '../../atoms/Box/Box';
import { Button } from '@/components/atoms';
import { PlainTextForm } from '@/components/organisms/Forms/PlainTextForm/PlainTextForm';
import { Size } from '../../../themes/testTheme';
//실패
export const CreateFailBottom: React.FC = () => {
    return (
        <Box variant="createSuccessBottom">
            <div> 
                {/* span말고 나중에 label로 바꿔야함 */}
                <Span variant="b3" color="white">
                    메세지
                </Span>
                <PlainTextForm></PlainTextForm>
            </div>
            <div className="flex justify-between">
                <Button variant="something">뭔가 버튼</Button>
                <Button variant="check">확인</Button>
            </div>
        </Box>
    );
};

//성공
export const CreateSuccessBottom: React.FC = () => {
    return (
        <>
        <Box variant="createSuccessBottom">
          <Box variant='createSuccessBottomMesssageContainer'>
            <Span variant='b3' color='white'>메세지</Span>
            <Box variant='createSuccessBottomMesssage'>
                <Span variant='b3' color='white'>
                American Barbizon School_Satori Canton
                </Span>
            </Box>
            <Span variant='b3' color='white'>설명</Span>
            <Box variant='createSuccessBottomDescription'>
            <Span variant='b3' color='white'>
            Close up of a forest drwaing on white paper laying on a oak wooden table with color pencils and coffee on it, shot from above in natural sunlight. The style is hyper - realistic, with a high level of detail in the texture.                </Span>
            </Box>
          </Box>

        </Box>
        {/* <Box variant='createSuccessButton'>
            <Button variant="something">무슨 버튼임?</Button>
            <Button variant="check">확인</Button>
            </Box> */}
            </>
);
};



