// fe_dr_study/src/app/moderator/new/_components/Step4.tsx
import React, { FormEvent } from 'react';
import { Button } from '@/components/atoms';
import { StepProps } from './type';

const Step4: React.FC<StepProps> = ({ onNext, onBack, onSubmit, data }) => {
    return (
        <>
            <div className="w-full h-max flex flex-row justify-around gap-6 items-center">
                작성하신 내용을 확인하고 제출해주세요.
            </div>
            <div className="w-full h-max flex flex-row justify-end gap-2">
                <Button size="md" onClick={onBack} color="dark">
                    이전으로
                </Button>
                <Button
                    size="md"
                    onClick={(e) => {
                        onSubmit(e, data);
                    }}
                >
                    제출하기
                </Button>
            </div>
        </>
    );
};

export default Step4;
