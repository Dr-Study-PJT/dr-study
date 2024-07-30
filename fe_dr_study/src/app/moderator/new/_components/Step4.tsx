import React, { FormEvent } from 'react';
import { Button, Label } from '@/components/atoms';
import { StepProps } from './type';
import { createModerator } from '../../_api';

const Step4: React.FC<StepProps> = ({ onNext, onBack, data, setData }) => {
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        await createModerator(data);
    };

    return (
        <>
            <div className="w-full h-max flex flex-row justify-around gap-6 items-center">
                제출 페이지
            </div>
            <div className="w-full h-max flex flex-row justify-end gap-2">
                <Button size="md" onClick={onBack} color="dark">
                    이전으로
                </Button>
                <Button size="md" onClick={handleSubmit}>
                    제출하기
                </Button>
            </div>
        </>
    );
};

export default Step4;
