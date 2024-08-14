import { Button } from '@/components/atoms';
import { RootState } from '@/store';
import { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';

const FinishMyTurnButton = ({
    setIsFinishMyTurn,
}: {
    setIsFinishMyTurn: Dispatch<SetStateAction<boolean>>;
}) => {
    const handleClick = () => {
        setIsFinishMyTurn(true);
    };

    const focusingPeerId = useSelector(
        (state: RootState) => state.focusingPeerId.focusingPeerId,
    );

    return (
        <>
            {focusingPeerId && (
                <Button size="lg" color="gray" onClick={handleClick}>
                    내 발화 차례 종료하기
                </Button>
            )}
        </>
    );
};

export default FinishMyTurnButton;
