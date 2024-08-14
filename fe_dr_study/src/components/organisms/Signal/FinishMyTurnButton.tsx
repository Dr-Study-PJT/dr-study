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

    const isAvatarSpeaking = useSelector(
        (state: RootState) => state.isAvatarSpeaking.isAvatarSpeaking,
    );

    console.log('isAvatarSpeaking:', isAvatarSpeaking);

    return (
        <>
            {isAvatarSpeaking && (
                <Button size="lg" color="gray" onClick={handleClick}>
                    내 발화 차례 종료하기
                </Button>
            )}
        </>
    );
};

export default FinishMyTurnButton;
