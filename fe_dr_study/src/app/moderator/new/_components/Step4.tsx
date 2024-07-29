import React from 'react';
import { Button, Label } from '@/components/atoms';
import { StepProps } from './type';

const Step4: React.FC<StepProps> = ({ onNext, onBack, data, setData }) => {
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
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
                <Button size="md">제출하기</Button>
            </div>
        </>
    );
};

export default Step4;
